export function finddifference(startTime, endTime){
    var diff = 0;
    var start = startTime.split(':');
    var end = endTime.split(':');

    if(Number(end[0]) > Number(start[0]) ||
        (Number(end[0]) === Number(start[0]) && Number(end[1]) >= Number(start[1]))){
        diff = Number(end[0]) - Number(start[0]);
    }
    else{
        diff = 24 - Number(start[0]) + Number(end[0]);
    }

    diff = (diff - 1) * 60 + (60 - Number(start[1])) + Number(end[1]);

    return diff;
}

export function allocateMinutes(minutes, startTime, endTime){
    var start = startTime.split(':');
    var end = endTime.split(':');
    var time = [];
    var hr = Number(start[0]);

    while(minutes != 0 && minutes >= 60){
        minutes = minutes - 60;

        if(minutes > 0){
            hr = hr + 1;

            if(hr == 24){
                hr = 0;
            }

            time.push(hr + ":" + start[1]);
        }

        if(minutes == 0){
            hr = hr + 1;
            time.push(hr + ":" + start[1]);
        }
    }

    if(minutes < 60 && minutes > 0){        
        if((60 - start[1]) < minutes){
            hr = hr + 1;

            if(hr == 24){
                hr = 0;
            }
            time.push(hr + ":" + start[1] + "-" + (hr + 1) + ":" + (minutes - (60 - Number(start[1]))));
        }
    }
    return time;
}