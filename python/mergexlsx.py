import pandas as pd
import glob

# Get all Excel (.xls) files
file_list = glob.glob(r"C:\Users\as400\Documents\Systems3000\Archive_System3000\Check Register\loaded\*.xls")

if not file_list:
    print("No Excel (.xls) files found in the specified directory.")
else:
    # Read and concatenate all files
    df_list = [pd.read_excel(file, engine="xlrd") for file in file_list]
    merged_df = pd.concat(df_list, ignore_index=True)

    # Define max rows per sheet
    max_rows = 1048576

    # Create an Excel writer with ZIP64 enabled
    with pd.ExcelWriter("merged_file.xlsx", engine="xlsxwriter") as writer:
        writer.book.use_zip64()  # Enable ZIP64 to handle large files
        
        # Split into multiple sheets
        for i in range(0, len(merged_df), max_rows):
            chunk = merged_df.iloc[i:i + max_rows]  # Get a subset of the DataFrame
            sheet_name = f"Sheet_{i // max_rows + 1}"  # Unique sheet name
            chunk.to_excel(writer, sheet_name=sheet_name, index=False)
    
    print(f"Merged into multiple sheets successfully! ({len(merged_df)} rows)")
