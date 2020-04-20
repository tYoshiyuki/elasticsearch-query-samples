# Elasticsearch SQL を クエリに変換する方法です。

POST /_sql/translate
{
  "query" : "SELECT * FROM bank WHERE (age = 30 OR age = 20) AND city = 'Brogan'"
}
