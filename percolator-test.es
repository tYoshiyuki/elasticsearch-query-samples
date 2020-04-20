# -------------------------------------------------------
# percolator の動作確認です。
# -------------------------------------------------------

# サンプルとなるインデックスを作成します。
DELETE /percolator-test

# percolatorを持つマッピングを作成します。
PUT /percolator-test
{
  "mappings": {
    "properties": {
      "condition-percolator": {
        "type": "percolator"
      },
      "station": {
        "type": "keyword"
      },
      "rent": {
        "type": "integer"
      }
    }
  }
}

# データを投入します。
PUT /percolator-test/_doc/1
{
  "condition-percolator": {
    "bool": {
      "filter": [
        {
          "term": {
            "station": "新宿"
          }
        },
        {
          "range": {
            "rent": {
              "lte": 80000
            }
          }
        }
      ]
    }
  }
}
 
PUT /percolator-test/_doc/2
{
  "condition-percolator": {
    "bool": {
      "filter": [
        {
          "term": {
            "station": "池袋"
          }
        },
        {
          "range": {
            "rent": {
              "lte": 90000
            }
          }
        }
      ]
    }
  }
}
 
PUT /percolator-test/_doc/3
{
  "condition-percolator": {
    "bool": {
      "filter": [
        {
          "term": {
            "station": "池袋"
          }
        },
        {
          "range": {
            "rent": {
              "lte": 75000
            }
          }
        }
      ]
    }
  }
}

# percolatorを使ったデータの取得です。
GET /percolator-test/_search
{
  "query": {
    "percolate": {
      "field": "condition-percolator",
      "document": {
        "station": "池袋",
        "rent": 80000
      }
    }
  }
}
