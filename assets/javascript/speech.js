$(document).ready(function () {

    $('#test').click(function(){
        var quizContainer = $('#quiz');
        var ansDiv = $('#answers input');

        console.log(quizContainer.text());
        speakThis(quizContainer.text());
        ansDiv.each(function(){
            console.log(this.value);
            speakThis(this.value);
        });
    });

    var speakThis = function (utterThis) {
        if ('speechSynthesis' in window) {
            speechSynthesis.onvoiceschanged = function () {
                var $voicelist = $('#voices');

                if ($voicelist.find('option').length == 0) {
                    speechSynthesis.getVoices().forEach(function (voice, index) {
                        var $option = $('<option>')
                            .val(index)
                            .html(voice.name + (voice.default ? ' (default)' : ''));

                        $voicelist.append($option);
                    });
                }
            }
            var msg = new SpeechSynthesisUtterance();
            var voices = window.speechSynthesis.getVoices();
            msg.voice = voices[$('#voices').val()];
            //   msg.rate = $('#rate').val() / 10;
            //   msg.pitch = $('#pitch').val();
            msg.text = utterThis;
            speechSynthesis.speak(msg);
        }
    };

});