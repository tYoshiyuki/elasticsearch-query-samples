# -------------------------------------------------------
# analyzerを持つマッピングを作成するサンプルです。
# -------------------------------------------------------
PUT /msg
{
  "settings": {
    "analysis": {
      "analyzer": {
        "my_kuromoji_analyzer": {
          "type": "custom",
          "tokenizer": "kuromoji_tokenizer"
        }
      }
    }
  },
  "mappings": {
    "properties": {
      "message" : {
        "type": "text",
        "analyzer": "my_kuromoji_analyzer"
      }
    }
  }
}

# アナライザーの動作を確認する場合のクエリです。
GET _analyze
{
  "text": ["アリアハン"],
  "analyzer": "kuromoji"
}
