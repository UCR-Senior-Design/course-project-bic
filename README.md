Senior Design Project (Team BIC)
# README: Neuroimaging Data Processing and Visualization Pipeline

This guide provides instructions on running fMRIPrep on a Google Cloud Platform (GCP) Virtual Machine (VM) instance. The necessary dependencies, including fMRIPrep, FreeSurfer, and FSL, was installed on the VM by Professor Ballard.

## External Dependency Installation (Mac OS):

### FSL Installation:

1. Visit the [FSL website](https://fsl.fmrib.ox.ac.uk/fsl/fslwiki/) for Mac OS.
2. Open Terminal on your Mac (can be found in /Applications/Utilities).
3. Run the following commands in Terminal:
    ```bash
    cd ~/Downloads
    python fslinstaller.py
    ```
4. If the Python command does not run, install Python by following the directions on [Python's official website](https://www.python.org).
* Note: The installation process may take hours. Do not terminate the terminal until you see "FSL successfully installed."
5. To check if FSL is installed correctly, run the following commands:
    ```bash
    echo $FSLDIR
    flirt -version
    which imcp
    ```

### FreeSurfer Installation:

1. Visit the [FreeSurfer website](https://surfer.nmr.mgh.harvard.edu/fswiki/DownloadAndInstall) for Mac OS.
2. Before starting the installation, ensure you have enough storage on your laptop (about 16-20 GB of free space).
3. Download and install the Xquartz 2.8.2 release from [XQuartz](https://www.xquartz.org) before installing FreeSurfer.
4. On the above link, click the 7.X_releases link. From there, scroll down to 7.3.2 release.
5. Install the last link from the 7.3.2 release, which is: freesurfer-darwin-macOS-7.3.2.pkg.

## Steps

1. **Download fMRI Dataset Script:**
   - Download the fMRI dataset preprocessing script from [OpenNeuro](https://openneuro.org/datasets/ds004663/versions/1.0.2/download#) to your local machine.

2. **Connect to GCP VM:**
   - Use SSH to connect to the GCP VM instance.

3. **Upload Script to GCP VM:**
      - Click on the "Upload Files" button at the top of the VM instance details page.
      - Select the fMRI preprocessing script from your local machine and upload it to the VM.

4. **Navigate to Script Directory:**
   - Go to the directory where you uploaded the fMRI preprocessing script.

5. **Run the Script:**
   - Execute the following command to run the preprocessing script:
     ```bash
     bash <script_name>.sh
     ```
     Replace `<script_name>` with the actual name of the script you uploaded.

6. **Navigate to the Data Directory:**
   - Change to the directory where your fMRI dataset is located.

7. **Run fMRIPrep:**
   - Execute the following command to run fMRIPrep:
     ```bash
     sudo docker run -it --rm -v <input_dir>:/data:ro -v <output_dir>:/out -v <workspace_dir>:/work -v <FreeSurferLicense_dir>:/opt/freesurfer/license.txt:ro nipreps/fmriprep /data /out participant --participant-label sub-06 --work-dir /work --ignore fieldmaps slicetiming t2w flair --fs-license-file /opt/freesurfer/license.txt
     ```

     Replace `<input_dir>` with the path to your fMRI dataset and `<output_dir>` with the desired output directory. Replace `<workspace_dir>` with desired workspace directory and `<FreeSurferLicense_dir>` with the path to your FreeSurferLicense.

8. **Review Output:**
   - Once the process is complete, review the output directory for preprocessed fMRI data and derivatives.

## To run website:
Go to cd flask_backend
1. Create a Virtual Environment
   On Mac:
   python3 -m venv env
   On Windows:
   python -m venv env
2. Activate Virtual Environment
   On Mac:
   source env/bin/activate
   On windows:
   .\env\Scripts\activate
3. Install Requirements
   pip install -r requirements.txt
4. Next NPM Install
   npm install
   npm install --save-dev concurrently
5. Run it all
   npm start
   

