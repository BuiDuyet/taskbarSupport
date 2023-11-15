$(function(){
  if ('speechSynthesis' in window) {
    speechSynthesis.onvoiceschanged = function() {
      var $voicelist = $('#voices');

      if($voicelist.find('option').length == 0) {
        speechSynthesis.getVoices().forEach(function(voice, index) {
          var $option = $('<option>')
          .val(index)
          .html(voice.name + (voice.default ? ' (default)' :''));

          $voicelist.append($option);
        });

        $voicelist.material_select();
      }
    }

    $('#speak').click(function(){
      var text = $('#message').val();
      var msg = new SpeechSynthesisUtterance();
      var voices = window.speechSynthesis.getVoices();
      msg.voice = voices[$('#voices').val()];
      msg.rate = $('#rate').val() / 10;
      msg.pitch = $('#pitch').val();
      msg.text = text;

      msg.onend = function(e) {
        console.log('Finished in ' + event.elapsedTime + ' seconds.');
      };

      speechSynthesis.speak(msg);
    })
  } else {
    $('#modal1').openModal();
  }

  var speaking = false; // Biến để kiểm tra xem đang nói hay không

  $('#speak').click(function () {
    // Kiểm tra xem đang nói hay không
    if (speaking) {
      speechSynthesis.cancel(); // Hủy bỏ quá trình nói nếu đang nói
      speaking = false; // Cập nhật trạng thái nói về false
      return;
    }

    // Nếu không đang nói, thực hiện quá trình chuyển từ văn bản sang giọng nói
    var text = $('#message').val();
    var msg = new SpeechSynthesisUtterance();
    var voices = window.speechSynthesis.getVoices();
    msg.voice = voices[$('#voices').val()];
    msg.rate = $('#rate').val() / 10;
    msg.pitch = $('#pitch').val();
    msg.text = text;

    msg.onend = function (e) {
      console.log('Finished in ' + event.elapsedTime + ' seconds.');
      speaking = false; // Cập nhật trạng thái nói về false khi nói kết thúc
    };

    speaking = true; // Cập nhật trạng thái nói về true khi bắt đầu nói
    speechSynthesis.speak(msg);
  });

  // Thêm xử lý sự kiện click cho nút dừng
  $('#stop').click(function () {
    speechSynthesis.cancel(); // Hủy bỏ quá trình nói
    speaking = false; // Cập nhật trạng thái nói về false
  });
});