import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'backend')))

from app.ingestion.gdelt import compute_source_hash

def test_compute_source_hash_deduplication():
    h1 = compute_source_hash("Reuters", "https://reuters.com/article1", "2026-03-28")
    h2 = compute_source_hash("reuters ", "https://reuters.com/article1 ", "2026-03-28")
    h3 = compute_source_hash("Reuters", "https://reuters.com/article2", "2026-03-28")
    
    # h1 and h2 should be identical due to normalization
    assert h1 == h2
    # h3 should differ due to different URL
    assert h1 != h3
