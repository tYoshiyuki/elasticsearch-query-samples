# -------------------------------------------------------
# type flattened なドキュメントを更新するサンプルです。
# -------------------------------------------------------
# サンプルのインデックスを作成します。
DELETE /bug_reports

# type flattened を持つマッピングを登録します。
PUT /bug_reports
{
  "mappings": {
    "properties": {
      "title": {
        "type": "text"
      },
      "labels": {
        "type": "flattened"
      }
    }
  }
}

# ドキュメントを登録します。
POST bug_reports/_doc/1
{
  "title": "Results are not sorted correctly.",
  "labels": {
    "priority": "urgent",
    "release": ["v1.2.5", "v1.3.0"],
    "timestamp": {
      "created": 1541458026,
      "closed": 1541457010
    }
  }
}

# データを確認します。
GET bug_reports/_search

# -------------------------------------------------------
#        "_source" : {
#          "title" : "Results are not sorted correctly.",
#          "labels" : {
#            "priority" : "urgent",
#            "release" : [
#              "v1.2.5",
#              "v1.3.0"
#            ],
#            "timestamp" : {
#              "created" : 1541458026,
#              "closed" : 1541457010
#            }
#          }
#        }
# -------------------------------------------------------

# type flattened に項目を追加してみます。
POST bug_reports/_update/1
{
  "doc": {
    "labels": {
      "hoge": "fuga"
    }
  }
}

# データを確認します。
GET bug_reports/_search

# -------------------------------------------------------
#        "_source" : {
#          "title" : "Results are not sorted correctly.",
#          "labels" : {
#            "priority" : "urgent",
#            "release" : [
#              "v1.2.5",
#              "v1.3.0"
#            ],
#            "timestamp" : {
#              "created" : 1541458026,
#              "closed" : 1541457010
#            },
#            "hoge" : "fuga"
#          }
#        }
# -------------------------------------------------------

# type flattened の項目を更新してみます。
POST bug_reports/_update/1
{
  "doc": {
    "labels": {
      "priority": "update test"
    }
  }
}

# データを確認します。
GET bug_reports/_search

# -------------------------------------------------------
#        "_source" : {
#          "title" : "Results are not sorted correctly.",
#          "labels" : {
#            "priority" : "update test",
#            "release" : [
#              "v1.2.5",
#              "v1.3.0"
#            ],
#            "timestamp" : {
#              "created" : 1541458026,
#              "closed" : 1541457010
#            },
#            "hoge" : "fuga"
#          }
#        }
# -------------------------------------------------------