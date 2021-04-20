# %%
import shutil
import sqlite3

import pandas as pd

# %%

apple = pd.read_csv("./AAPL.csv")

# %%

# Make date a datetime
apple["Date"] = pd.to_datetime(apple["Date"])

# Make YEAR, MONTH, DAY
apple["year"] = apple.Date.dt.year
apple["month"] = apple.Date.dt.month
apple["day"] = apple.Date.dt.day

# Fix column names
apple.columns = apple.columns.map(lambda x: x.lower())
apple.columns = apple.columns.map(lambda x: x.replace(" ", "_"))

apple = apple[
    [
        "date",
        "year",
        "month",
        "day",
        "open",
        "high",
        "low",
        "close",
        "adj_close",
        "volume",
    ]
]

# %%

# Copy initial DB to static dir
shutil.copyfile("./acs-1-year-2015.sqlite", "../static/dbs/sample.sqlite")

# Open new DB
conn = sqlite3.connect("../static/dbs/sample.sqlite")
c = conn.cursor()

# %%

# Create table
c.execute(
    """
CREATE TABLE apple_stock (
    date datetime,
    year int,
    month int,
    day int,
    open float,
    high float,
    low float,
    adj_close float,
    close float,
    volume int
)
"""
)

# %%

# Insert apple data
apple.to_sql("apple_stock", conn, if_exists="append", index=False)

# %%

a = c.execute("SELECT * FROM apple_stock")
a.fetchall()

# %%

# Write to DB
c.close()

# %%
