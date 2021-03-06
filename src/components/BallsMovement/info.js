import React from 'react';
import {style} from "typestyle";

const Info = (props) =>
{
    return (
        <div className={styles.info} style={{
            width: "calc( 50% - 5px)",
            height: "calc(100% - 10px)",
            verticalAlign: "top",
            display: "inline-block",
            background: "white",
            boxShadow: "inset rgb(136, 136, 136) 0px 0px 3px 0px",
            textAlign: "justify",
            marginBottom: "10px",
            overflowY: "auto",
            padding: 20,
            overflowX: "hidden",
            borderRadius: "2px",
        }}>
            Обычно формулу пути, пройденном телом при равноускоренном или равнозамедленном
            движении в школьных учебниках выводят, используя идею интегрирования – делят весь путь на
            равные малые отрезки, и скорость при прохождении каждого отрезка приближенно считают
            постоянной. Результат получается в виде суммы арифметической прогрессии. Однако есть простой и
            наглядный метод вывода этой формулы, не выходящий за рамки элементарной математики.<br/>
            Рассмотрим две материальные точки, которые начинают движение из одной и той же точки в
            противоположных направлениях. При этом одно тело движется равноускоренно с нулевой начальной
            скоростью и за время <code>T</code> достигает скорости <code>V</code>, другое начинает равнозамедленное
            движение со скоростью <code>-V</code> (в противоположном первому направлении) и за то же
            время <code>T</code> его скорость убывает до нуля.
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
        $nest: {
            "& > div": {
                display: "flex",
                justifyContent: "space-between"
            }
        }
    }),
};