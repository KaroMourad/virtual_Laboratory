import React from 'react';
import {style} from "typestyle";

const Info = ({startClicked, handleStart, initialValue, onchange1}) =>
{
    return (
        <div className={styles.info}>
            Обычно формулу пути, пройденном телом при равноускоренном или равнозамедленном
            движении в школьных учебниках выводят, используя идею интегрирования – делят весь путь на
            равные малые отрезки, и скорость при прохождении каждого отрезка приближенно считают
            постоянной. Результат получается в виде суммы арифметической прогрессии. Однако есть простой и
            наглядный метод вывода этой формулы, не выходящий за рамки элементарной математики.<br/>
            Рассмотрим две материальные точки, которые начинают движение из одной и той же точки в
            противоположных направлениях. При этом одно тело движется равноускоренно с нулевой начальной
            скоростью и за время <code>T</code> достигает скорости <code>V</code>, другое начинает равнозамедленное
            движение со скоростью <code>-V</code> (в противоположном первому направлении) и за то же
            время <code>t</code> его
            скорость убывает до нуля.
            Очевидно, что ускорения этих точек равны по величине и по направлению, что хорошо видно
            на графике зависимости скоростей от времени. Алгебраически движение описывается следующими
            формулами: <br/>
            проекция скорости первого тела равна
            <div><br/><code>V1(t)=a*t,</code> (1)</div>
            а второго тела будет
            <div><br/><code>V2(t)= -V+a*t.</code> (2)</div>
            Относительная скорость постоянна и равна <code>V</code>, поэтому расстояние между точками растет
            пропорционально времени. Но пути, пройденные точками за время <code>T</code> равны, в чем можно убедиться
            засняв движение одной из точек и прокрутив фильм задом наперед. Отсюда вытекает конечный
            результат: <div><br/><code>S = V*T/2 = a*T<sup>2</sup>/2.</code> (3)</div>
        </div>
    );
};

export default Info;

const styles = {
    info: style({
        textAlign: "justify",
        flex: 1,
        marginBottom: 20,
        overflowY: "auto",
        paddingRight: 20,
        paddingTop: 20,
        $nest: {
            "& > div": {
                display: "flex",
                justifyContent: "space-between"
            }
        }
    }),
};