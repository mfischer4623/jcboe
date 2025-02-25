import pandas as pd
import glob

# Get all Excel files
file_list = glob.glob("C:\Users\as400\Documents\Systems3000\Archive_System3000\Pay-output\excel files\*.xlsx")

# Read and concatenate all files
df_list = [pd.read_excel(file) for file in file_list]
merged_df = pd.concat(df_list, ignore_index=True)

# Save to a new Excel file
merged_df.to_excel("merged_file.xlsx", index=False)

print("Merged into a single sheet successfully!")