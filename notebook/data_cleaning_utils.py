from pathlib import Path

import pandas as pd

MODULE_DIR: Path = Path(__file__).resolve().parent
RAW_DATA_PATH: Path = MODULE_DIR.parent / "data" / "raw" / "dirty_cafe_sales.csv"
MAX_CHARS: int = 120
RANDOM_STATE: int = 42


def analyze_metadata(data: pd.DataFrame) -> pd.DataFrame:
    """Return column metadata and unique values for a DataFrame."""
    return pd.DataFrame(
        {
            "Columns": data.columns,
            "Non-Null Count": data.notna().sum().to_numpy(),
            "Dtype": data.dtypes.to_numpy(),
            "Unique Values": [data[column].unique() for column in data.columns],
        }
    )