from pathlib import Path

import pandas as pd

NOTEBOOK_PATH = Path(__file__).resolve().parent
RAW_DATA_PATH = NOTEBOOK_PATH.parent / "data" / "raw" / "dirty_cafe_sales.csv"
MAX_CHARS = 120
RANDOM_STATE = 42  # sample reproducibility


def analyze_metadata(data):
    """Reproduce pd.info() with additional information about unique values in each column."""
    metadata_summary = pd.DataFrame(
        {
            "Columns": data.columns,
            "Non-Null Count": data.notna().sum().to_numpy(),
            "Dtype": data.dtypes.to_numpy(),
            "Unique Values": [data[column].unique() for column in data.columns],
        }
    )
    return metadata_summary