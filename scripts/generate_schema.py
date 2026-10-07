import os
import sys

REPO_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
sys.path.insert(0, os.path.join(REPO_ROOT, "backend"))

from sqlalchemy.schema import CreateIndex, CreateTable
from sqlalchemy.dialects import postgresql

from app.db import models
from app.db.database import Base

OUTPUT_PATH = os.path.join(REPO_ROOT, "supabase", "schema.sql")
EXTENSIONS = ["uuid-ossp", "pg_trgm", "postgis"]
DIALECT = postgresql.dialect()


def tidy(block):
    lines = [line.rstrip() for line in str(block).strip().splitlines()]
    return "\n".join(lines).rstrip()


def build_schema():
    tables = Base.metadata.sorted_tables
    for table in tables:
        table.schema = "public"

    lines = []
    for extension in EXTENSIONS:
        lines.append('CREATE EXTENSION IF NOT EXISTS "%s";' % extension)
    lines.append("")

    for table in tables:
        lines.append(tidy(CreateTable(table, if_not_exists=True).compile(dialect=DIALECT)) + ";")
        lines.append("")

    indexes = []
    for table in tables:
        for index in sorted(table.indexes, key=lambda i: i.name):
            indexes.append(tidy(CreateIndex(index, if_not_exists=True).compile(dialect=DIALECT)) + ";")
    if indexes:
        lines.extend(indexes)
        lines.append("")

    names = [table.name for table in tables]

    for name in names:
        lines.append("ALTER TABLE public.%s ENABLE ROW LEVEL SECURITY;" % name)
    lines.append("")

    for name in names:
        policy = "Allow public read access on %s" % name
        lines.append('DROP POLICY IF EXISTS "%s" ON public.%s;' % (policy, name))
        lines.append('CREATE POLICY "%s" ON public.%s FOR SELECT USING (true);' % (policy, name))
    lines.append("")

    for name in names:
        insert_policy = "Allow service role insert on %s" % name
        update_policy = "Allow service role update on %s" % name
        lines.append('DROP POLICY IF EXISTS "%s" ON public.%s;' % (insert_policy, name))
        lines.append('CREATE POLICY "%s" ON public.%s FOR INSERT WITH CHECK (true);' % (insert_policy, name))
        lines.append('DROP POLICY IF EXISTS "%s" ON public.%s;' % (update_policy, name))
        lines.append('CREATE POLICY "%s" ON public.%s FOR UPDATE USING (true);' % (update_policy, name))

    return "\n".join(lines).rstrip() + "\n"


def main():
    schema = build_schema()
    with open(OUTPUT_PATH, "w", encoding="utf-8", newline="\n") as handle:
        handle.write(schema)
    print("Wrote %s" % OUTPUT_PATH)
    print("Tables: %d" % len(Base.metadata.sorted_tables))


if __name__ == "__main__":
    main()
