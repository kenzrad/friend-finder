$("#submit-survey").on("click", function(event) {
    event.preventDefault();

    //makes an object with username, userimage, and empty array to later hold the survey responses
    var surveyData = {
        userName: $("#name-text").val().trim(),
        userImage: $("#image-text").val().trim(),
        surveyResponses: []
    };

    //loop to get all of the survey response data from the 10 questions
    for(i=1; i<11; i++) {
        surveyData.surveyResponses.push(parseInt($(`#question${i}`).val()))
    }
    console.log(surveyData);
    postData(surveyData);
    getFriendData(surveyData.surveyResponses);

});


function postData(userData) {
    $.post("/api/friends", userData, function(data) {
        console.log(`Posting data ${JSON.stringify(data)}`);
    });  
}


function getFriendData(userSurveyData) {
    console.log("I'm in the get friends function!")
    $.ajax({
        url: '/api/friends',
        method: 'GET'
    }).then(function(data) {
        console.log("getting the data");
        console.log(`Getting data: ${JSON.stringify(data)}`);
        checkCompatibility(userSurveyData, data);


    })
}



function checkCompatibility(userSurveyData, allData) {
    //Convert each user's results into a simple array of numbers (ex: `[5, 1, 4, 4, 5, 1, 2, 5, 4, 1]`)
    var bestFriend = {
        name: "You Have No Friends",
        image: "https://hackspirit.com/wp-content/uploads/2018/08/lonelyl.jpg",
        score: 0,
    };

    for (i=0 ; i < allData.length-1; i++) {
        var currentName = allData[i].userName;
        var currentImage = allData[i].userImage;
        var currentSurveyData = allData[i].surveyResponses;
        var currentScore = 0;

        for(j=0; j < currentSurveyData.length; j++) {
            var calc = Math.abs(parseInt(currentSurveyData[j]) - parseInt(userSurveyData[j]))
            currentScore += calc;
        }

        var convertedScore = Math.floor(((40 - currentScore) / 40 * 100));
        console.log(`${currentName} converted score is ${convertedScore}`)
        if (convertedScore > bestFriend.score) {
            bestFriend.name = currentName;
            bestFriend.image = currentImage;
            bestFriend.score = convertedScore;
            console.log(`Your latest best friend is ${bestFriend.name} with a score of ${bestFriend.score}%`)
        }
    };

    printBestFriend(bestFriend);
}

function printBestFriend(bestFriend) {
    console.log("I'm in the best friend function!");
    //put match data in the modal
    $("#best-friend-name").text(`${bestFriend.name}`);
    $("#best-friend-image").attr("src", bestFriend.image);
    $("#best-friend-score").text(`Compatibility Score: ${bestFriend.score}%`);

    //show the modal
    $("#best-friend-modal").modal("show");
    
       
}
