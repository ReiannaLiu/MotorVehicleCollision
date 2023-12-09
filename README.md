# Decode NYC Crash 2022 

## Overview
This project offers a comprehensive analysis of motor vehicle collisions in New York City. By leveraging diverse datasets, it uncovers patterns in accidents, evaluates contributing factors, and examines the influence of weather conditions. The result is an interactive dashboard, enriched with infographics and data visualizations, enabling users to delve into the nuances of traffic safety within specific zip codes.

The project is mainly driven by the following objectives:
1. understand accidents spatially, temporally, and based on factors such as weather conditions, vehicle types, and other vehicular causes
2. identify the specific factors influencing different types of accidents involving pedestrians, cyclists, and motorists
3. examine how the combined influence of various  weather-related information and aspects of the driver's conduct that played a role in the accident affected the severity of accidents



## Features
- **Interactive Maps**: Custom popups per zip code revealing vital statistics.
- **Infographic Pages**: In-depth statistical breakdowns on accident data.
- **Analysis Board**: Insightful exploration of factors influencing collisions.
- **Data Visualizations**: Engaging charts showcasing accident distribution.

## Technical Stack
- **Frontend**: HTML, CSS, Bootstrap for responsive design.
- **Data Visualization**: Chart.js and Plotly.js for interactive charts, Matplotlib and seaborn for static charts.  
- **Mapping**: Leaflet.js for dynamic map interfaces.
- **Data Analysis**: Python, Pandas, and NumPy for data processing.
- **Backend Framework**: Flask for server-side operations.
- **Database**: SQLite and SQLAlchemy ORM for data management.

## Exploratory Data Analysis (EDA)
The project utilizes two primary Jupyter notebooks for EDA:

1. **Collisions EDA**: `collisions_EDA_plots.ipynb`
   - Focuses on identifying key factors contributing to accidents.
   - Visualizes accident data by vehicle types and contributing factors.

2. **Weather Impact EDA**: `weather_collision_EDA.ipynb`
   - Assesses how weather conditions correlate with accident rates.
   - Heatmaps and kernel density plots highlight environmental influences.

### Key Analysis Techniques
- **Pandas and NumPy**: For sophisticated data manipulation.
- **Matplotlib and Seaborn**: For creating diverse visualizations.
- **Data Cleaning**: Ensuring accuracy and reliability in analysis.

### Insights and Visualizations
- **Contributing Factors**: Highlighting 'Driver Inattention/Distraction' as a critical element.
- **Weather Conditions**: Analyzing accidents in different weather scenarios.
- **Temporal Patterns**: Revealing peak accident times and days.
- **Seasonality Analysis**: Understanding month-wise accident trends.

## Machine Learning (ML) 

### Classification Models
The classification models are built to predict accident severity based on weather conditions and accident's contributing factors. 

#### Data Preprocessing
- **Data Normalization**: Normalizing the data using StandardScaler and OneHotEncoder to prepare the data for the machine learning models.
- **Data Splitting**: Splitting the data into training and testing datasets using train_test_split.
- **Data Model Building**: Build the models using **OneVsRestClassifier**, **SDGClassifier with grid search**, **Random Forest Classifier**, **Gradient Boosting Classifier**, and **Neural Network Classifier**. 
- **Data Model Evaluation**: Evaluate the models using **accuracy score**, **confusion matrix**, and **classification report**.

### Clustering Models



## Setup and Installation
1. **Clone the Repository**: Fetch the project files onto your system.
2. **Install Dependencies**: Run `pip install -r requirements.txt`.
3. **Launch the Flask Server**: Execute `python app.py`.
4. **Access the Dashboard**: Visit `localhost:5000` in your web browser.

## Usage Guide
- **Interactive Map**: Accessible at the homepage. Click on any zip code for detailed infographics.
- **Infographics**: Directly explore at `/infographic/<zip_code>`.
- **Analysis Board**: Dive into deeper analyses at `/analysis_board`.
- **API Documentation**: Utilize the cleaned datasets for extended analysis.

## Contributing to the Project
We encourage contributions! If you're looking to add or modify features, please adhere to the existing code structure and document any changes comprehensively.
