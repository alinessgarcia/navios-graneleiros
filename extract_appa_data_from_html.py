
import pandas as pd

# Load the HTML content from the file
with open("appa_page.html", "r", encoding="utf-8") as f:
    html_content = f.read()

# Use pandas to read HTML tables without specifying header
tables = pd.read_html(html_content)

# Assuming the tables are still at index 1 and 2 based on previous debugging
df_atracados_raw = tables[1]
df_programados_raw = tables[2]

print("--- Raw ATRACADOS Table ---")
print(df_atracados_raw.head())
print("\n--- Raw PROGRAMADOS Table ---")
print(df_programados_raw.head())

# Now, let's try to clean these raw dataframes to get the actual data and headers
# The actual headers are in the second row (index 1) of these raw dataframes
headers_atracados = df_atracados_raw.iloc[1].tolist()
headers_programados = df_programados_raw.iloc[1].tolist()

# The actual data starts from the third row (index 2)
df_atracados = df_atracados_raw[2:].copy()
df_atracados.columns = headers_atracados

df_programados = df_programados_raw[2:].copy()
df_programados.columns = headers_programados

# Combine the two dataframes
df_combined = pd.concat([df_atracados, df_programados], ignore_index=True)

# Filter for relevant merchandise
keywords = ["SOJA", "MILHO", "TRIGO", "FARELO DE SOJA", "FERTILIZANTES", "MAP", "CLORETOS DE POTASSIO", "SUPERFOSFATO", "UREIA"]
df_filtered = df_combined[df_combined["Mercadoria"].str.contains("|".join(keywords), case=False, na=False)]

# Select and rename columns for clarity
df_final = df_filtered[[
    "Embarcação",
    "Mercadoria",
    "Previsto", # This column is present in both tables and represents tonnage
    "Atracação",
    "Chegada",
    "Janela Operacional"
]].copy()

df_final.rename(columns={
    "Embarcação": "Nome do Navio",
    "Mercadoria": "Produto",
    "Previsto": "Tonelagem (Tons)",
    "Atracação": "Data/Hora Atracação",
    "Chegada": "Data/Hora Chegada",
    "Janela Operacional": "Janela Operacional (Estimativa de Saída)"
}, inplace=True)

# Save to CSV
df_final.to_csv("appa_graneleiros_data_from_html.csv", index=False)

print("Dados extraídos e salvos em appa_graneleiros_data_from_html.csv")


