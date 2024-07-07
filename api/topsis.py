from flask import Flask
import math
import pandas as pd
import numpy as np
from sklearn.preprocessing import normalize

app = Flask(__name__)

@app.route('/api/ml')
def predict():

  df  = pd.read_csv("dataset\data.csv")

  vol_normalized = normalize(df[['volume']], axis=0)  # axis=0 normalizes along the columns
  bin_ids = df['bin_id']
  # Normalizing the 'time' column
  time_normalized = normalize(df[['time']], axis=0)  # axis=0 normalizes along the columns
  toxicity = df['toxicity']
  df['volume_percentage'] = (df['volume'] / 1200) * 100

  weights = {
      'toxicity': 0.9,
      'volume': 1,
      'time_since_pickup': 0.7
  }


  def calculate_weighted_matrix(toxicity, volume, time_since_pickup, weights, bin_ids):
      weighted_matrix = []

      for t, v, ts, bin_id in zip(toxicity, volume, time_since_pickup, bin_ids):
          weighted_toxicity = t * weights['toxicity']
          weighted_volume = v * weights['volume']
          weighted_time = ts * weights['time_since_pickup']

          weighted_row = [bin_id, weighted_toxicity, weighted_volume, weighted_time]
          weighted_matrix.append(weighted_row)

      return weighted_matrix

  # Calculate scores for each dustbin
  ideal = [1,1,1]
  negIdeal = [0,0,0]

  #calculate score
  def calcScore(weighted_matrix, ideal,negIdeal):

    score = []

    for row in weighted_matrix:
      bin_id = row[0]
      weighted_value = row[1]
      sum_pos = 0
      sum_neg = 0
      for j,k in zip(weighted_value,ideal):
        sum_pos += (j-k)**2

      for j,k in zip(weighted_value,negIdeal):
        sum_neg += (j-k)**2

      sum_pos = math.sqrt(sum_pos)
      sum_neg = math.sqrt(sum_neg)

      score_i = sum_neg/(sum_pos + sum_neg)
      score.append([bin_id,score_i])

    return score

  weighted_mat = calculate_weighted_matrix(toxicity,vol_normalized,time_normalized,weights,bin_ids)

  def convertToMatrix(weighted_matrix):

    wt_mat = []
    for row in weighted_mat:
        bin_id = row[0]
        weighted_toxicity = row[1]
        weighted_vol = row[2][0]
        weighted_time = row[3][0]
        wt_mat.append([bin_id,[weighted_toxicity,weighted_vol,weighted_time]])

    return wt_mat

  wt_mat = convertToMatrix(weighted_mat)


  scores  = calcScore(wt_mat,ideal,negIdeal)
  sorted_Scores = sorted(scores, key=lambda x: x[1], reverse=True)

  scores_df = pd.DataFrame(sorted_Scores, columns=['bin_id', 'score'])
  top_bin_ids = scores_df.head(10)['bin_id'].tolist()
  top_bins_data = df[df['bin_id'].isin(top_bin_ids)][['lat', 'long', 'volume_percentage', 'toxicity']]

  return {'bin_list':top_bins_data}