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
);
"""
)

# %%

# Insert apple data
apple.to_sql("apple_stock", conn, if_exists="append", index=False)

# %%

a = c.execute("SELECT * FROM apple_stock")
print(len(a.fetchall()))

# %% football

players = pd.read_csv("basketball_players.csv")
teams = pd.read_csv("basketball_teams.csv")
state_detail = pd.read_csv("basketball_state_detail.csv")

# %%

# Create tables
c.execute(
    """
CREATE TABLE basketball_players (
    school str,
    school_short str,
    name str,
    position str,
    weight int,
    height int,
    year str,
    hometown str,
    state str,
    conference str,
    county_code int,
    state_code int
)
"""
)

c.execute(
    """
CREATE TABLE basketball_teams (
    conference str,
    conference_1 str,
    city str,
    url str
)
"""
)


c.execute(
    """
CREATE TABLE basketball_state_detail (
   id int,
   name str,
   male_pop int,
   male_age_per float,
   male_18_to_24, float
)
"""
)

# %%

# Insert basketball data

players.to_sql("basketball_players", conn, if_exists="append", index=False)
teams.to_sql("basketball_teams", conn, if_exists="append", index=False)
state_detail.to_sql("basketball_state_detail", conn, if_exists="append", index=False)

# %%

a = c.execute("SELECT * FROM basketball_players")
print(len(a.fetchall()))

a = c.execute("SELECT * FROM basketball_teams")
print(len(a.fetchall()))

a = c.execute("SELECT * FROM basketball_state_detail")
print(len(a.fetchall()))


# %%

# Write to DB
c.close()

# %%
