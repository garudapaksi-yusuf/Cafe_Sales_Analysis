# Cafe Sales Analysis

A data-cleaning and visualization project for a synthetic cafe sales dataset. The project converts intentionally dirty transaction data into a consistent CSV and presents the cleaned dataset in an interactive Tableau dashboard.

## Project Overview

The workflow has three main parts:

1. Inspect and clean 10,000 raw cafe transactions as documented in the [data cleaning notebook](https://nbviewer.org/github/garudapaksi-yusuf/Cafe_Sales_Analysis/blob/main/notebook/data_cleaning.ipynb).
2. Export the [cleaned, analysis-ready dataset](https://github.com/garudapaksi-yusuf/Cafe_Sales_Analysis/blob/main/data/transformed/clean_cafe_sales.csv).
3. Explore the results in Tableau through a [responsive web embed](https://cafe-sales-analysis.netlify.app/).

The analysis covers missing values, invalid placeholders, inconsistent numeric types, item-price relationships, and transaction dates.

## Repository Structure

```text
Cafe_Sales_Analysis/
|-- app/
|   |-- index.html          # Responsive Tableau embedding page
|   |-- app.js              # Tableau API setup and responsive scaling
|-- dashboard/
|   |-- Cafe_Sales_Dashboard.twbx
|-- data/
|   |-- raw/
|   |   |-- dirty_cafe_sales.csv
|   |-- transformed/
|       |-- clean_cafe_sales.csv
|-- notebook/
|   |-- data_cleaning.ipynb
|   |-- data_cleaning_utils.py
`-- README.md
```

## License

No explicit license is included in this repository. The source dataset is subject to the terms of its Kaggle dataset page.