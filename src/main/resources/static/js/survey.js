// 更新当前题目答题时间
function updateQuestionTime() {
    const elapsedSeconds = Math.floor((Date.now() - questionStartTime) / 1000);
    questionTimeEl.textContent = elapsedSeconds;

    setTimeout(updateQuestionTime, 1000);
}

// 更新进度条
function updateProgressBar() {
    const progress = ((currentPairIndex) / images.length) * 100;
    progressBar.style.width = `${progress}%`;
    progressBar.textContent = `${Math.round(progress)}%`;
    progressBar.setAttribute('aria-valuenow', progress);
}



// 调查结束（隐藏问卷调查表，显示问卷调查结果信息）
function finishSurvey() {
    surveySection.classList.add('hidden');
    resultsSection.classList.remove('hidden');

    // 问卷调查结束时间 - 开始问卷调查时间
    totalSurveyTime = (Date.now() - startTime) / 1000;
    totalTimeEl.textContent = totalSurveyTime.toFixed(2);

    // 计算平均时间（每个图片的耗时之和/图片数量）
    const avgTime = questionTimes.reduce((a, b) => a + b, 0) / questionTimes.length;
    averageTimeEl.textContent = avgTime.toFixed(2);
}

//// 下载调查结果
//downloadResultsBtn.addEventListener('click', function() {
//    const resultsData = {
//        studentId: studentId,
//        age: age,
//        gender: gender,
//        totalTime: totalSurveyTime,
//        averageTime: questionTimes.reduce((a, b) => a + b, 0) / questionTimes.length,
//        responses: results
//    };
//
//    const dataStr = JSON.stringify(resultsData, null, 2);
//    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
//
//    const exportFileDefaultName = `survey_results_${studentId}_${new Date().toISOString().slice(0,10)}.json`;
//
//    const linkElement = document.createElement('a');
//    linkElement.setAttribute('href', dataUri);
//    linkElement.setAttribute('download', exportFileDefaultName);
//    linkElement.click();
//});

//将结果数据保存至后端服务器
function saveResultsToServer() {
    const resultsData = {
        studentName: studentName,
        studentId: studentId,
        age: age,
        gender: gender,
        totalTime: totalSurveyTime,
        averageTime: questionTimes.reduce((a, b) => a + b, 0) / questionTimes.length,
        responses: results
    };

    // 发送到服务器保存
    fetch('/save-results', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(resultsData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('结果已保存到服务器');
        } else {
            alert('保存失败: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('保存出错');
    });
}