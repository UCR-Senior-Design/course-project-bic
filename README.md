# Website README

## Overview

This website is designed to display and analyze outputs from fMRIprep, specifically the images it produces. It provides different ways to view these images and plots, catering to both specific subjects and subject types.

## Image Viewing

### Viewing Images for a Specific Subject

You can view all images created for a specific subject in one page. This allows for easy comparison and analysis of different image outputs related to a single subject.

### Viewing Images for a Specific Subject Type


Alternatively, you can view all images created for a specific subject type in one page. This helps in analyzing trends and patterns across multiple subjects of the same type.

## Plotting

### Types of Plots

For each `desc-confounds_timeseries.tsv` file, three different types of plots are generated:

1. **Rotation Plot**: Displays rotation values (`rot_x`, `rot_y`, `rot_z`) over time.
2. **Translation Plot**: Displays translation values (`trans_x`, `trans_y`, `trans_z`) over time.
3. **Framewise Displacement Plot**: Displays framewise displacement values over time.

### Viewing Plots for a Specific Subject

You can view all plots for a specific subject in one page. This facilitates the analysis of motion patterns and trends for individual subjects.

### Viewing Plots for a Specific Plot Type

Alternatively, you can view all plots for a specific plot type in one page. This allows for comparison and analysis of similar plots across multiple subjects or subject types.

## Threshold/Spikes Functionality

The website includes a threshold/spike function that allows users to input a threshold and a maximum number of spikes. It will output all framewise displacement plots that exceed the specified threshold and have spikes above the given maximum threshold.

## SSH Tunneling into VM using VS Code

To SSH tunnel into the VM using VS Code, follow these steps:

1. Download and install Visual Studio Code.
2. Click on Extensions in the sidebar and search for "Remote-SSH". Install the extension.
3. Click on View at the top of the page and then click Command Palette.
4. Enter "Remote-SSH" in the command palette and choose "Open SSH Configuration File...". This will allow you to choose a config file in your home directory in the `.ssh` folder. The path should be similar to `/Users/<username>/.ssh/config`.
5. If it's the first time using this, the config file will be filled with dummy information. Create something similar to:

```
Host <name of your choice>
  HostName <VM External IP Address>
  User <username on VM>
  IdentityFile <path to private key>
```
6. If you don't have a public and private key, you can create one using:

Leave the passphrase empty.


7. Add the public key to SSH keys on the GCP VM instance.
8. Now you can connect to the VM by going to View/Command Palette again, typing in "Remote-SSH", and choosing "Connect to Host...". Choose your host. You can see that the connection was established successfully on the bottom left of the page.

## Before Running Website

### Adjusting `run.sh` Path

Follow these steps to adjust the paths in the run.sh script:

1. Open the run.sh file in a text editor.

2. Modify the file paths to reflect the actual directory structure of your environment.

3. Save the changes to the run.sh file.

### Permission Changes

Ensure that proper permissions are set to allow writing access to the directory where your data is stored. This is necessary for the website to create plots and store any generated files.

To grant writing access to all users, you can execute the following command:

```
chmod o+wx /path/to/data/directory
```

This command grants write (w) and execute (x) permissions to others (o) for the specified directory.

## Running the Website

To run the website, follow these steps:

1. Navigate to the directory where the website is located.
2. Run the script `run.sh`:
```
./run.sh
```
3. Once the website is running, you can access it by opening a web browser and navigating to the provided link. It will be under Vite.

## Issues Encountered and Solutions

### Issue 1: pm v10.4.0 is known not to run on Node.js v10.19.0.

- **Error Message**: `ERROR: pm v10.4.0 is known not to run on Node.js v10.19.0. This version of pm supports the following node versions: ^18.17.0 || >=20.5.0`
- **Solution**: Run the following commands:

  ```
  npm uninstall -g npm
  npm install -g npm@20.5.0
  ```

### Issue 1 version 2: pm v10.4.0 is known not to run on Node.js v10.19.0.

  ```
  nvm install 18.17.0
  ```

### Issue 2: python
  ```
  pip install -r requirements.txt
  ```
