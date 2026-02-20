import os

# Specify root directory and subdirectories to search
ROOT_DIR = "."  # current directory
SUBDIRECTORIES = ["components", "pages", "redux"]  # change these to your actual subdirectories
OUTPUT_FILE = "aggregated_code.txt"

def should_include(file_path):
    return os.path.isfile(file_path) and file_path.endswith('.js')

def gather_files(root_dir, subdirs):
    files_to_read = []

    # Include all files in the root directory
    for item in os.listdir(root_dir):
        path = os.path.join(root_dir, item)
        if should_include(path):
            files_to_read.append(path)

    # Include all files from specified subdirectories recursively
    for subdir in subdirs:
        full_subdir_path = os.path.join(root_dir, subdir)
        for dirpath, _, filenames in os.walk(full_subdir_path):
            for filename in filenames:
                full_path = os.path.join(dirpath, filename)
                if should_include(full_path):
                    files_to_read.append(full_path)

    return files_to_read

def aggregate_code(files, output_path):
    with open(output_path, "w", encoding="utf-8") as out_file:
        for file_path in files:
            out_file.write(f"{file_path}\n")
            out_file.write("//" + "-" * 40 + "\n")
            with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
                out_file.write(f.read())
            out_file.write("\n\n")

if __name__ == "__main__":
    files = gather_files(ROOT_DIR, SUBDIRECTORIES)
    aggregate_code(files, OUTPUT_FILE)
    print(f"Aggregated code written to {OUTPUT_FILE}")
