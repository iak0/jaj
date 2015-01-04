var pos = require("pos")
var lexer = new pos.Lexer()
var tagger = new pos.Tagger()

var punctuation = ['"', '.', "?", "!", ",", ":", ";"];

function jej(message) {
    var wordTags = tagger.tag(lexer.lex(message))
    var result = wordTags[0][0] + " "
    if (punctuation.indexOf(wordTags[0][1]) > -1) result = result.slice(0, - 1)
    console.log(wordTags)
    var i = 1
    var last = 1;
    while (i < wordTags.length) {
        if (punctuation.indexOf(wordTags[i][1]) > -1) {
            result = result.slice(0, - 1)
            result += wordTags[i][0] + (wordTags[i][0]=="\'"?"":" ")
            i++
            continue
        }
        if (wordTags[i][1] == 'NN' && wordTags[i][0] != "I" && wordTags[i-1][1] != '"') {
            if (i+1 >= wordTags.length || wordTags[i+1][1] != 'NN' && wordTags[i+1][1] != 'NNS' && last > 1){
                result += "jej "
                i++
                last=0
                continue;
            } 
        }
        if (wordTags[i][1] == 'NNS' && wordTags[i-1][1] != '"') {
            if (i+1 >= wordTags.length || wordTags[i+1][1] != 'NN' && wordTags[i+1][1] != 'NNS' && last > 1){
                result += "jejes "
                i++
                last=0
                continue;
            } 
        }
        if (['VB', 'VBD', 'VBZ', "JJ"].indexOf(wordTags[i][1]) > -1 && wordTags[i-1][1] != '"') {
            if ((!(i+1 >= wordTags.length || wordTags[i+1][1] == 'NN') || i < wordTags.length) && last >= 3){
                result += "jej "
                i++
                last=0
                continue;
            } 
        }
        result += wordTags[i][0] + " "
        i++
        last++
    }
    return result
}

module.exports = jej;