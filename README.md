# Decode NYC Crash 2023

## Overview
This project offers a comprehensive analysis of motor vehicle collisions in New York City. By leveraging diverse datasets, it uncovers patterns in accidents, evaluates contributing factors, and examines the influence of weather conditions. The result is an interactive dashboard, enriched with infographics and data visualizations, enabling users to delve into the nuances of traffic safety within specific zip codes.

The project is mainly driven by the following objectives:
1. understand accidents spatially, temporally, and based on factors such as weather conditions, vehicle types, and other vehicular causes
2. identify the specific factors influencing different types of accidents involving pedestrians, cyclists, and motorists
3. examine how the combined influence of various weather-related information and aspects of the driver's conduct that played a role in the accident affected the severity of accidents



## Features
- **Interactive Maps**: Custom popups per zip code revealing vital statistics.
- **Infographic Pages**: In-depth statistical breakdowns on accident data.
- **Analysis Board**: Insightful exploration of factors influencing collisions.
- **Data Visualizations**: Engaging charts showcasing accident distribution.

## Technical Stack
- **Frontend**: HTML, CSS, Bootstrap for responsive design.
- **Data Visualization**: Chart.js and Plotly.js for interactive charts, Matplotlib and seaborn for static charts.  
- **Mapping and Geospatial Visualization**: Employing Leaflet.js for dynamic map interfaces, complemented by ArcGIS for advanced clustering model map visualizations.
- **Data Analysis**: Python, Pandas, and NumPy for data processing.
- **Backend Framework**: Flask for server-side operations.
- **Database**: SQLite and SQLAlchemy ORM for data management.

## Exploratory Data Analysis (EDA)
The project utilizes three primary Jupyter notebooks for EDA:

1. **Collisions EDA**: `collisions_EDA_plots.ipynb`
   - Examines aggregated temporal patterns based on the day of the week, month, and time of day. 
   - Observes accident data by vehicle types and contributing factors.
   

2. **Weather Impact EDA**: `weather_collision_EDA.ipynb`
   - Evaluates the correlation between weather conditions and accident rates of different severity level, as well as the contributing factors to accidents, within the top 10 accident-prone areas.
   - Heatmaps and kernel density plots highlight environmental influences.

3. **Nonmotorists-Involved Accidents EDA**: `nonmotorist_EDA.ipynb`
   - Focuses on accidents involving nonmotorist victims.
   - Visualizes the influence of temporal, spatial, and weather factors on the relative frequency of severe accidents compared to the overall occurrence under specific conditions. (e.g. the number of accidents involving nonmotorists on cloudy days leading to multiple nonmotorist injuries or fatalities)


### Key Analysis Techniques
- **Pandas and NumPy**: For sophisticated data manipulation.
- **Matplotlib and Seaborn**: For creating diverse visualizations.
- **Data Cleaning**: Ensuring accuracy and reliability in analysis.

### Insights and Visualizations
- **Contributing Factors**: Highlighting 'Driver Inattention/Distraction' and 'Failure to Yield Right-of-Way' as two predominant contributing factors. On freezing cold days, "Unsafe Speed" is notably more problematic, with a significantly higher relative frequency compared to other seasons. For non-motorists-involved collisions, "Bicyclist Error/Confusion" is more pronounced than "Pedestrians Error/Confusion", particularly on extremely cold days, days with poor visibility, and days with significantly strong wind intensity.
- **Weather Conditions**: Analyzing the impact of weather on daily traffic accidents counts. Observing that 'rainy' and 'cloudy' days show a wide range of accident counts, with 'rainy' exhibiting some high outliers; and that warm and hot days exhibit a higher median number of crashes than other days.
- **Temporal Patterns**: Revealing peak accident times and days are in midweek days, during working hours, particularly Fridays during the hours of 3 pm to 6 pm, while being more evenly distributed throughout the day (even at night hours) on weekends.
- **Seasonality Analysis**: Identifying a weekly and monthly seasonality in accidents, where troughs usually occur in winter and during holiday seasons (particularly at the beginning and end of the year) and summer (from May to June) is the peak season for accidents. 
- **Severity of Accidents**: Classifying the accidents based on the total number of injuries and deaths. An accident is labeled as 'Minor' if there are no injuries or deaths, 'Serious' if there are injuries but no deaths, and 'Fatal' if it involves deaths. Within the 'Serious' category, accidents are further divided into subcategories: 'Serious (Low)' with 0-3 injuries, 'Serious (Medium)' with 3-10 injuries, and 'Serious (High)' with more than 10 injuries. In the 'Fatal' category, accidents are additionally segmented into 'Fatal' with 0-3 deaths and 'Very Fatal' with more than 3 deaths. Observing that as the number of parties involved in an accident increases, the severity level tends to rise. Notably, the two accidents involving pedestrians, cyclists, and motorists resulted in fatalities.

## Machine Learning (ML) 

### Classification Models
The classification models are built to predict whether an accident involves pedestrians or cyclists based on weather conditions, accident's contributing factors and other spatial-temporal elements. The intention is to explore the distinctions between accidents resulting in injuries or fatalities to nonmotorists and those exclusively involving motorists.

#### Data Preprocessing
- **Data Normalization**: Normalizing the data using StandardScaler and OneHotEncoder to prepare the data for the machine learning models.
- **Data Splitting**: Splitting the data into training and testing datasets using train_test_split.
- **Data Model Building**: Build the models using **SDGClassifier with grid search**, **Random Forest Classifier**, **Gradient Boosting Classifier**, and **Neural Network Classifier**. 
- **Data Model Evaluation**: Evaluate the models using **accuracy score**, **recall score**, **AUC score**, **f1 score**, **Average Precision score**, **confusion matrix**, and **classification report**.

#### Model Performance
Our models achieve high accuracy scores overall; however, their performance in other metrics is poor. This outcome aligns with our expectations due to the constrained accessibility to additional traffic-related attributes. Factors such as real-time traffic volume, road conditions, and specific information about involved vehicle types (which, although present in our dataset, contain a lot of missing values) are crucial variables that could significantly enhance the models' explanatory power. The absence of these critical attributes likely contributes to the models' limitations in effectively capturing the complexities of traffic-related scenarios.


### Clustering Models
The clustering models are designed to group various factors and attributes that may contribute to accidents in order to gain insights into potential patterns or associations among these factors. The primary objective is to identify distinct clusters within the data and visualize them on a map of New York City to discern any spatial patterns or differences among the clusters.

#### Data Preprocessing
Data Normalization: The data is preprocessed by applying StandardScaler for numerical features and Ordinal encoding for categorical features.

#### Clustering Model
K-Means Clustering: The K-Means clustering algorithm is utilized to partition the data into four clusters. The choice of four clusters is determined through the elbow method, which helps identify an appropriate number of clusters by examining the within-cluster sum of squares at different cluster counts.

#### Variables Description
The clustering analysis focuses on the following three columns, as they are considered the most crucial factors contributing to accidents:

- 'precip_category': This column accounts for the level of precipitation during the day of the accident
- 'crash_hour_category': This column is mapped to the following categories based on crash hour:'Early Morning','Late Night','Other Hours','Rush Hours'
- 'severity_of_accident': This column represents the severity of accidents, categorized based on injuries and fatalities

The selection of these three columns is based on their significance in representing weather conditions, accident severity, and timing, which are among the most critical aspects of accidents. The decision to omit the 'contributing_factor' column, which contains numerous causes with limited entries, was made to focus on more conclusive and informative features.

#### Visualization
Cluster Visualization on ArcGIS Map: The results of the clustering analysis are visualized on an ArcGIS map, accessible at https://arcg.is/0H9ej8. This visualization provides a spatial representation of the identified clusters, allowing us to observe any geographical patterns or trends among the clustered factors.

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
