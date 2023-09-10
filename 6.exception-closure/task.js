﻿function parseCount(input) {
    const count = Number.parseFloat(input);
    if (isNaN(count)) {
        throw new Error("Невалидное значение");
    }
    return count;
}

function validateCount(input) {
    try {
        return parseCount(input);
    } catch (error) {
        return error;
    }
}

class Triangle {
    constructor(a, b, c) {
        if (a + b < c || a + c < b || b + c < a) {
            throw new Error("Треугольник с такими сторонами не существует");
        }
        this.a = a;
        this.b = b;
        this.c = c;
    }

    get perimeter() {
        return this.a + this.b + this.c;
    }

    get area() {
        const p = this.perimeter / 2;
        return +(Math.sqrt(p * (p - this.a) * (p - this.b) * (p - this.c))).toFixed(3);
    }
}

function getTriangle(a, b, c) {
    try {
        return new Triangle(a, b, c);
    } catch (error) {
        const m = "Ошибка! Треугольник не существует";
        return {
            get perimeter() {
                return m;
            },
            get area() {
                return m;
            }
        }
    }
}
