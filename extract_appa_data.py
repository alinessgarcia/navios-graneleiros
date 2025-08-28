
import pandas as pd

markdown_table = """
# RELATÓRIO LINE-UP

ADMINISTRAÇÃO DOS PORTOS DE PARANAGUÁ E ANTONINA  LINE UP RETROATIVO | Emissão: 23/08/2025 18:14 Período selecionado: 23/08/2025 17:26 | 

| ATRACADOS |
| --- |
 Programação | DUV | Berço | Embarcação | IMO | LOA | DWT | Bordo | Sentido | Agência | Operador | Mercadoria | Atracação | Chegada | Janela Operacional | Prancha (t/dia) | Tons/Dia | Previsto | Realizado | Saldo Operador | Saldo Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 77203 | 0311012025 | 219 | OPAL LEADER | 9318498 | 176,00 | 10.855,00 | BE | Imp/Exp | LACHMANN | MARCON | VEICULOS | 23/08/2025 16:25 | 23/08/2025 10:00 | 0 Movs. | 639 Movs. | 0 Movs. | 639 Movs. | 639 Movs. |
| 2 | 77257 | 0379142025 | 202 | SAGA BEIJA-FLOR | 9160798 | 199,20 | 46.990,00 | BE | Exp | MARCON | ROCHA TERMINAIS PORTUARIOS E LOGISTICA S.A. | PASTA QUIM.MADEIRA DE N/CONIF. | 23/08/2025 16:10 | 23/08/2025 01:24 | 0,000 Tons. | 10.183,000 Tons. | 0,000 Tons. | 10.183,000 Tons. | 10.183,000 Tons. |
| 3 | 77205 | 0331382025 | 215 | GRANDE SAN PAOLO | 9253208 | 213,88 | 26.169,00 | BE | Imp/Exp | LACHMANN | TCP | VEICULOS | 23/08/2025 01:05 | 0,000 Tons. | 3.942,000 Tons. | 0,000 Tons. | 3.942,000 Tons. | 3.942,000 Tons. |
| 4 | 77095 | 0385442025 | 212 | NAVIOS FELICITY I | 9864679 | 228,90 | 81.962,00 | BB | Exp | ALPHAMAR | CARGONAVE | FARELO DE SOJA | 21/08/2025 15:45 | 24/07/2025 17:40 | 21/08/2025 15:45 - 24/08/2025 03:54 | 30.000,000 | 31.852,000 Tons. | 67.000,000 Tons. | 60.264,000 Tons. | 6.735,780 Tons. | 6.735,780 Tons. |
| 5 | 77302 | 0381192025 | 218 | NYK DIANA | 9337688 | 294,12 | 65.976,00 | BE | Imp/Exp | WILSON SONS | TCP _(LXN)_ | CONTÊINERES (CONTENTORES) INCL | 22/08/2025 22:15 | 21/08/2025 03:30 | 0 Movs. | 500 Movs. | 0 Movs. | 500 Movs. | 500 Movs. |
| 6 | 76998 | 0361592025 | 113 | WHITE WANDERER | 9621869 | 189,99 | 37.869,20 | BE | Imp | FORTENAVE | PORTO PONTA DO FELIX S/A | CLORETOS DE POTASSIO | 21/08/2025 09:20 | 18/08/2025 23:30 | 21/08/2025 09:20 - 22/08/2025 10:11 | 6.000,000 | 1.394,000 Tons. | 5.000,000 Tons. | 4.833,000 Tons. | 166,690 Tons. | 166,690 Tons. |
| 7 | 77194 | 0361712025 | 114 | DAIWAN LEADER | 9796535 | 179,97 | 34.442,00 | BB | Imp | FORTENAVE | PORTO PONTA DO FELIX S/A | SUPERFOSFATO SIMPLES (Outros) | 21/08/2025 16:36 | 20/08/2025 06:42 | 21/08/2025 16:36 - 26/08/2025 17:00 | 6.000,000 | 5.462,000 Tons. | 28.870,000 Tons. | 10.088,000 Tons. | 18.781,770 Tons. | 18.781,770 Tons. |
| 8 | 76929 | 0316682025 | 216 | COPIAPO | 9687526 | 299,90 | 116.933,00 | BE | Imp/Exp | ROCHAMAR | TCP _(WME)_ | CONTÊINERES (CONTENTORES) INCL | 23/08/2025 16:40 | 19/08/2025 01:46 | 0 Movs. | 1.050 Movs. | 0 Movs. | 1.050 Movs. | 1.050 Movs. |
| 9 | 77264 | 0380262025 | 143 | ALDER EXPRESS | 9934163 | 182,90 | 49.832,10 | BB | Imp | WILSON SONS | CATTALINI | OLEO DIESEL | 20/08/2025 07:50 | 18/08/2025 15:00 | 20/08/2025 07:50 - 23/08/2025 00:38 | 15.000,000 | 12.265,000 Tons. | 37.913,000 Tons. | 37.820,000 Tons. | 92,650 Tons. | 92,650 Tons. |
| 10 | 77241 | 0374842025 | 213 | SHINE JADE | 9971472 | 229,00 | 82.376,80 | BB | Exp | ALPHAMAR | CARGONAVE | MILHO | 22/08/2025 04:20 | 18/08/2025 13:36 | 22/08/2025 04:20 - 23/08/2025 18:50 | 44.544,000 | 55.180,000 Tons. | 64.700,000 Tons. | 65.674,000 Tons. | \-974,290 Tons. | \-974,290 Tons. |
| 11 | 77282 | 0381492025 | 201 | CK BLUEBELL | 9595876 | 229,02 | 81.147,00 | BE | Exp | FERTIMPORT | TIBAGI | MILHO | 21/08/2025 21:40 | 18/08/2025 01:18 | 21/08/2025 21:40 - 25/08/2025 16:15 | 24.000,000 | 23.481,000 Tons. | 69.030,000 Tons. | 41.231,000 Tons. | 27.799,500 Tons. | 27.799,500 Tons. |
| 12 | 77218 | 0365572025 | 144 | CHEM BARIUM | 9838670 | 146,50 | 19.999,06 | BB | Exp | NORTH STAR | CATTALINI | ALCOOL ETILICO | 22/08/2025 09:25 | 15/08/2025 21:36 | 0,000 Tons. | 5.523,000 Tons. | 0,000 Tons. | 5.523,000 Tons. | 5.523,000 Tons. |
| 13 | 77273 | 0375832025 | 141 | MAERSK KIERA | 9431305 | 183,17 | 39.724,00 | BB | Exp | LACHMANN | TRANSPETRO PGUA | FUEL-OIL (OLEO COMBUSTIVEL) | 22/08/2025 18:40 | 13/08/2025 01:00 | 22/08/2025 18:40 - 24/08/2025 03:32 | 15.000,000 | 8.400,000 Tons. | 17.900,000 Tons. | 8.400,000 Tons. | 9.500,000 Tons. | 9.500,000 Tons. |
| 14 | 77074 | 0340852025 | 205 | KAPADOKYA | 9268083 | 171,59 | 32.262,00 | BB | Exp | MARCON | MARCON | OUTS.ACUCARES | 20/08/2025 01:30 | 03/08/2025 05:00 | 20/08/2025 01:30 - 27/08/2025 22:58 | 4.000,000 | 7.510,000 Tons. | 30.092,000 Tons. | 21.459,000 Tons. | 8.632,760 Tons. | 8.632,760 Tons. |
| 15 | 76990 | 0347652025 | 209 | XIN QI XING | 9592056 | 228,89 | 82.305,00 | BB | Imp | WILHELMSEN PORT SERVICE BRASIL LTDA | ROCHA TERMINAIS PORTUARIOS E LOGISTICA S.A. | SUPERFOSFATO,TEOR DE PENTOXIDO | 17/08/2025 17:15 | 31/07/2025 11:18 | 17/08/2025 17:15 - 26/08/2025 03:58 | 7.020,100 | 7.697,000 Tons. | 45.016,000 Tons. | 30.081,000 Tons. | 14.934,540 Tons. | 15.355,100 Tons. |
| BB | Imp | WILHELMSEN PORT SERVICE BRASIL LTDA | HARBOR | SUPERFOSFATO,TEOR DE PENTOXIDO | 17/08/2025 17:15 | 31/07/2025 11:18 | 17/08/2025 17:15 - 27/08/2025 08:11 | 2.979,890 | 0,000 Tons. | 19.258,000 Tons. | 18.837,000 Tons. | 420,560 Tons. |
| 16 | 77031 | 0345032025 | 208 | PAVIDA NAREE | 9649885 | 180,00 | 35.340,00 | BE | Imp | AMART | ROCHA TERMINAIS PORTUARIOS E LOGISTICA S.A. | MAP | 20/08/2025 12:29 | 27/07/2025 14:30 | 20/08/2025 12:29 - 24/08/2025 17:10 | 8.000,000 | 7.839,000 Tons. | 33.041,000 Tons. | 29.294,000 Tons. | 3.746,560 Tons. | 3.746,560 Tons. |
| 17 | 77017 | 0331742025 | 211 | ABYSSINIAN | 9646728 | 180,00 | 36.064,00 | BE | Imp | ROCHAMAR | ROCHA TERMINAIS PORTUARIOS E LOGISTICA S.A. | FOSFATO MONO OU DISSODICO | 22/08/2025 15:22 | 24/07/2025 10:36 | 22/08/2025 15:22 - 25/08/2025 23:44 | 8.000,000 | 2.870,000 Tons. | 26.400,000 Tons. | 4.205,000 Tons. | 22.194,880 Tons. | 22.194,880 Tons. |
| PROGRAMADOS |
| --- |
 Programação | DUV | Berço | Embarcação | IMO | LOA | Cal. Cheg. | Cal. Saída | DWT | Bordo | Sentido | Agência | Operador | Mercadoria | Chegada | ETB | Janela Operacional | Prancha (t/dia) | Previsto |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 77223 | 0387902025 | 214 | NEW BONANZA | 9342815 | 224,94 | 6,84 | 13,01 | 76.596,00 | BB | Exp | WILSON SONS | CARGONAVE | SOJA | 67.300,000 Tons. |
| 2 | 77358 | 0389972025 | 201 | JIN MING 82 | 9632600 | 189,99 | 6,40 | 13,10 | 58.018,00 | BE | Exp | FERTIMPORT | TIBAGI | SOJA | 23/08/2025 00:01 | 52.300,000 Tons. |
| 3 | 77291 | 0382562025 | 213 | SCION CHARLOTTE | 1023982 | 229,00 | 7,20 | 13,10 | 82.000,00 | BB | Exp | FERTIMPORT | TIBAGI | FARELO DE SOJA | 23/08/2025 09:36 | 65.429,000 Tons. |
| 4 | 77289 | 0378082025 | 216 | SWANSEA | 9629469 | 270,90 | 10,00 | 10,00 | 80.529,00 | QB | Imp/Exp | UNIMAR | TCP _(NBR)_ | CONTÊINERES (CONTENTORES) INCL | 500 Movs. |
| 5 | 77110 | 0359982025 | 215 | GREEN OSAKA | 1027380 | 209,99 | 8,95 | 7,00 | 73.641,00 | QB | Imp | BPA | TCP _(COT)_ | CONTÊINERES (CONTENTORES) INCL | 22/08/2025 17:06 | 564,000 Tons. |
| 6 | 76931 | 0316732025 | 218 | SEASPAN EMPIRE | 9407160 | 294,13 | 11,00 | 8,00 | 67.170,00 | QB | Imp/Exp | ROCHAMAR | TCP _(GS1)_ | CONTÊINERES (CONTENTORES) INCL | 1.050 Movs. |
| 7 | 76936 | 0316822025 | 215 | NC BRAVO | 9612791 | 223,91 | 11,00 | 8,00 | 48.044,00 | QB | Imp/Exp | ROCHAMAR | TCP _(NCO)_ | CONTÊINERES (CONTENTORES) INCL | 21/08/2025 03:00 | 1.050 Movs. |
| 8 | 77295 | 0379392025 | 142 | BUENA CONFIANZA | 9759264 | 119,95 | 7,50 | 7,00 | 8.764,91 | QB | Imp | LACHMANN | TRANSPETRO PGUA | GLP | 22/08/2025 17:30 | 9.000,000 Tons. |
| 9 | 77235 | 0368742025 | 144 | ISLA DE BIOKO | 9767235 | 186,00 | 11,00 | 9,00 | 51.609,00 | QB | Imp | ROCHAMAR | CATTALINI | METANOL | 27.006,000 Tons. |
| 10 | 77168 | 0377962025 | 212 | LOCARNO | 9461453 | 228,99 | 6,50 | 12,80 | 82.188,00 | BB | Exp | ALPHAMAR | ALPHAMAR PORT SERVICES | FARELO DE ...47125 bytes truncated..."""

def parse_markdown_table(markdown_string):
    lines = markdown_string.strip().split("\n")
    
    # Find the header line and the separator line for the 'ATRACADOS' table
    header_index_atracados = -1
    for i, line in enumerate(lines):
        if "| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |" in line:
            header_index_atracados = i - 1
            break
            
    if header_index_atracados == -1:
        return pd.DataFrame()

    header_line_atracados = lines[header_index_atracados]
    
    # Extract column names for 'ATRACADOS' table
    column_names_atracados = [h.strip() for h in header_line_atracados.split("|") if h.strip()]
    
    # Find the start of the data rows for 'ATRACADOS' table
    data_start_index_atracados = header_index_atracados + 2
    
    data_atracados = []
    for line in lines[data_start_index_atracados:]:
        if "| PROGRAMADOS |" in line:
            break
        if not line.strip():
            continue
        row_values = [v.strip() for v in line.split("|") if v.strip()]
        if len(row_values) == len(column_names_atracados):
            data_atracados.append(row_values)

    df_atracados = pd.DataFrame(data_atracados, columns=column_names_atracados)

    # Now for the 'PROGRAMADOS' table
    header_index_programados = -1
    for i, line in enumerate(lines):
        if "| PROGRAMADOS |" in line:
            for j in range(i + 1, len(lines)):
                if "| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |" in lines[j]:
                    header_index_programados = j - 1
                    break
            break

    if header_index_programados == -1:
        return df_atracados # Return only atracados if programados not found

    header_line_programados = lines[header_index_programados]
    column_names_programados = [h.strip() for h in header_line_programados.split("|") if h.strip()]
    data_start_index_programados = header_index_programados + 2

    data_programados = []
    for line in lines[data_start_index_programados:]:
        if not line.strip():
            continue
        row_values = [v.strip() for v in line.split("|") if v.strip()]
        if len(row_values) == len(column_names_programados):
            data_programados.append(row_values)

    df_programados = pd.DataFrame(data_programados, columns=column_names_programados)

    # Combine the two dataframes
    df_combined = pd.concat([df_atracados, df_programados], ignore_index=True)
    return df_combined


df = parse_markdown_table(markdown_table)

# Filter for relevant merchandise
keywords = ["SOJA", "MILHO", "TRIGO", "FARELO DE SOJA", "FERTILIZANTES", "MAP", "CLORETOS DE POTASSIO", "SUPERFOSFATO"]
df_filtered = df[df["Mercadoria"].str.contains("|".join(keywords), case=False, na=False)]

# Select and rename columns for clarity
df_final = df_filtered[[
    "Embarcação",
    "Mercadoria",
    "Tons/Dia",
    "Atracação",
    "Chegada",
    "Janela Operacional"
]].copy()

df_final.rename(columns={
    "Embarcação": "Nome do Navio",
    "Mercadoria": "Produto",
    "Tons/Dia": "Tonelagem (Tons)",
    "Atracação": "Data/Hora Atracação",
    "Chegada": "Data/Hora Chegada",
    "Janela Operacional": "Janela Operacional (Estimativa de Saída)"
}, inplace=True)

# Save to CSV
df_final.to_csv("appa_graneleiros_data.csv", index=False)

print("Dados extraídos e salvos em appa_graneleiros_data.csv")


