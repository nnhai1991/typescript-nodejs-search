class Comparator{
    static equalOrContains(field, value){
        return field == value || (field.indexOf && field.indexOf(value)>=0);
    }
}

export default Comparator;