# -------------------------------------------------------
# minimum_should_match のデフォルト挙動に関する確認です。
# -------------------------------------------------------

# -------------------------------------------------------
# https://www.elastic.co/guide/en/elasticsearch/reference/6.0/query-dsl-bool-query.html
# The clause (query) should appear in the matching document. 
# If the bool query is in a query context and has a must or filter clause then a document will match the bool query even if none of the should queries match. 
# In this case these clauses are only used to influence the score. 
# If the bool query is a filter context or has neither must or filter then at least one of the should queries must match a document for it to match the bool query. 
# This behavior may be explicitly controlled by settings the minimum_should_match parameter.
# -------------------------------------------------------

# Queryコンテキスト内で should を単独で使用した場合です。
# 単体条件を指定した場合は、必須条件となります。
# minimum_should_match = 1 と同等です。
GET /bank/_search
{
  "query": {
    "bool": {
      "should": [
        {
          "term": {
            "age": 20
          }
        }
      ]
    }
  },
  "_source": [
    "city",
    "address",
    "age"
  ],
  "collapse": {
    "field": "age"
  }
}

# -----------------------------------------
# この場合、age = 20 のドキュメントだけが引っ掛かります。
# -----------------------------------------

# Queryコンテキスト内で should を単独で使用した場合です。
# 複数条件を指定した場合は、OR条件となります。
# minimum_should_match = 1 と同等です。
GET /bank/_search
{
  "query": {
    "bool": {
      "should": [
        {
          "term": {
            "age": 20
          }
        },
        {
          "match": {
            "address": "Street"
          }
        }
      ]
    }
  },
  "_source": [
    "address",
    "age"
  ],
  "sort": [
    {
      "age": "desc"
    }
  ],
  "collapse": {
    "field": "age"
  }
}

# -----------------------------------------
# この場合、age = 20 以外のドキュメントも引っ掛かります。
# -----------------------------------------


# Filterコンテキスト内で should を must/filter と組み合わせて使用した場合です。
# OR条件となります。
# minimum_should_match = 0 と同等です。
GET /bank/_search
{
  "query": {
    "bool": {
      "filter": {
        "bool": {
          "should": {
            "term": {
              "age": 20
            }
          },
          "must": {
            "terms": {
              "city.keyword": [
                "Dante",
                "Nogal"
              ]
            }
          }
        }
      }
    }
  },
  "_source": [
    "city",
    "address",
    "age"
  ],
  "sort": [
    {
      "age": "desc"
    }
  ]
}

# -----------------------------------------
# この場合、age = 20 以外のドキュメントも引っ掛かります。
# -----------------------------------------
