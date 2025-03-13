export const getNivelDeRiesgo = (val) => {
    if (val < 0.07) {
        return 1;
    }
    else if (val < 0.20) {
        return 2;
    }
    else if (val < 0.35) {
        return 3;
    }
    else if (val < 0.90) {
        return 4;
    }
    else {

        return 5;
    }


}
