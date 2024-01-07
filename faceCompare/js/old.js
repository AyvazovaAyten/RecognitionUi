$(document).ready(function () {

    const dropArea = document.getElementsByClassName('image-drop-area');
    const checkBtn = document.getElementById('checkButton');
    const result = document.querySelector('.result');
    let resultText = document.getElementById('resultText');
    const firstDirectionBtn = document.getElementById('first-direction');
    const secondDirectionBtn = document.getElementById('second-direction');
    const firstDirectionResult = document.getElementById('first-direction-result');
    const secondDirectionResult = document.getElementById('second-direction-result');

    function readURL(input) {
        if (input.files && input.files[0]) {

            if (result.classList.contains('show')) {
                result.classList.remove('show');
                result.classList.add('hide');
            }
            resultText.innerText = "";
            let el = input.parentNode;
            let directionResult = el.parentNode.parentNode.parentNode.
            querySelector('.direction-container').querySelector('.direction-result');
            directionResult.querySelector('.direction-result_text').innerText="";

            var reader = new FileReader();
            reader.onload = function (e) {
                let preview = el.parentNode.querySelector('.imagePreview');
                $(preview).css('background-image', 'url(' + e.target.result + ')');
                $(preview).hide();
                $(preview).fadeIn(650);
                let filestr = reader.result.split('base64,');
                el.parentNode.querySelector('.hidden').value = filestr[1];
            }
            reader.readAsDataURL(input.files[0]);
        }
    }

    $(".imageUpload").change(function () {
        readURL(this);
    });


    checkBtn.addEventListener('click', () => {
        let firstImage = document.getElementById('firstImage');
        let secondImage = document.getElementById('secondImage');
        result.classList.add('show');
        result.classList.remove('hide');

        if (!firstImage.files.length || !secondImage.files.length) {
            resultText.innerText = "Zəhmət olmasa, şəkilləri yükləyin";
            return false;
        }

        let file1 = document.getElementById('file1').value;
        let file2 = document.getElementById('file2').value;

        console.log("file 1 is     " +file1);
        console.log("file 1 is     " +file2);
        

        $.ajax({
            url: `http://194.5.237.77:3003/compare`,
            type: "POST",
            crossDomain: true,
            dataType: 'json',
            xhrFields: {
                withCredentials: true
             },
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                "msgId": "jquery",
                'img1_base64': file1,
                'img2_base64': file2
            }),
            cache: false,
            success: (res) => {

                console.log(res);
                console.log(res.glasses)
                

            },
            error: (err) => {
                console.log(err);
                resultText.innerText = "ERROR";
                if (resultText.classList.contains('green')) {
                    resultText.classList.remove('green');
                }
                resultText.classList.add('red');
            }
        });

       

        // let iconContainer = document.getElementById('centered');
        // let leftHuman = document.getElementById('leftHuman');
        // let rightHuman = document.getElementById('rightHuman');

        // if (iconContainer.classList.contains('hide')) {
        //     iconContainer.classList.add('show');
        //     iconContainer.classList.remove('hide');
        //     leftHuman.classList.remove('left_collapsed');
        //     rightHuman.classList.remove('right_collapsed');
        //     leftHuman.classList.add('left_appart');
        //     rightHuman.classList.add('right_appart');
        // } else {
        //     iconContainer.classList.remove('show');
        //     iconContainer.classList.add('hide');
        //     leftHuman.classList.add('left_collapsed');
        //     rightHuman.classList.add('right_collapsed');
        //     leftHuman.classList.remove('left_appart');
        //     rightHuman.classList.remove('right_appart');
        // }

    });


    let getDirection = function (base64) {
        $.ajax({
            url: `http://45.80.175.27:5000/direction`,
            type: "POST",
            crossDomain: true,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                'img_base64': base64
            }),
            cache: false,
            success: (res) => {
                console.log('succes')
                return res;

            },
            error: (err) => {
                console.log('error')
                return err;
                
            }
        });
    };



    firstDirectionBtn.addEventListener('click', () => {
        firstDirectionBtn.disabled = true;
        let firstImage = document.getElementById('firstImage');
        firstDirectionResult.innerText = "";

        if (!firstImage.files.length) {
            firstDirectionResult.innerText = "Zəhmət olmasa, şəkil yükləyin";
            return false;
        }

        let file1 = document.getElementById('file1').value;

        $.ajax({
            url: `http://45.80.175.27:5000/direction`,
            type: "POST",
            crossDomain: true,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                'img_base64': file1
            }),
            cache: false,
            success: (res) => {
                console.log('success');
                console.log(res);
                firstDirectionResult.innerText = res;

            },
            error: (err) => {
                console.log('error');
                console.log(err);
                firstDirectionResult.innerText = "ERROR";
                
            }
        });
        firstDirectionBtn.disabled = false;

    });

    secondDirectionBtn.addEventListener('click', () => {
        let secondImage = document.getElementById('secondImage');
        secondDirectionResult.innerText = "";
        secondDirectionBtn.disabled = true;

        if (!secondImage.files.length) {
            secondDirectionResult.innerText = "Zəhmət olmasa, şəkil yükləyin";
            return false;
        }

        let file2 = document.getElementById('file2').value;

        $.ajax({
            url: `http://45.80.175.27:5000/direction`,
            type: "POST",
            crossDomain: true,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                'img_base64': file2
            }),
            cache: false,
            success: (res) => {
                console.log('success');
                console.log(res);
                secondDirectionResult.innerText = res;

            },
            error: (err) => {
                console.log('error');
                console.log(err);
                secondDirectionResult.innerText = "ERROR";
                
            }
        });
        secondDirectionBtn.disabled = false;

    });


});