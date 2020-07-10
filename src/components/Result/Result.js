import React from 'react';
import './Result.scss';
import img1 from '../../assets/img/1.png';
import img2 from '../../assets/img/2.png';
import img3 from '../../assets/img/3.png';
import img4 from '../../assets/img/4.png';
import img5 from '../../assets/img/5.png';


const Result = ({ score, total }) => {
    let scorePerCent = Math.round(100 * score / total) || 0;
    return (
        <div className="Result" >
            <img className="result__image" src={(scorePerCent >= 80) ? img5 :
                (scorePerCent >= 60) ? img4 :
                    (scorePerCent >= 40) ? img3 :
                        (scorePerCent >= 20) ? img2 : img1} alt="result" />
            <div className="title">Ваш результат</div>
            <div className="score">{scorePerCent} %</div>
        </div>
    );
}

export default Result;