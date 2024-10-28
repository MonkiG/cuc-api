/**
 * Class that represents a subject
 * @class
 */
class Subject {
  /**
   *
   * @param {string} nrc - Unique identifier for the subject
   * @param {string} code - Code of the subject
   * @param {string} name - Name of the subject
   * @param {string} sec - Section of the subject
   * @param {string} cr - Credits of the subject
   * @param {string} cup - Total capacity of the subject
   * @param {string} dis - Available seats for the subject
   * @param {string} proffesorName - Name of the professor teaching the subject
   * @param {string} ses - Session information of the subject
   * @param {string} hour - Hour(s) the subject takes place
   * @param {string} days - Days the subject takes place
   * @param {string} building - Building where the subject is held
   * @param {string} classroom - Classroom where the subject is held
   * @param {string} period - Period in which the subject is offered
   */
  constructor(
    nrc,
    code,
    name,
    sec,
    cr,
    cup,
    dis,
    proffesorName,
    ses,
    hour,
    days,
    building,
    classroom,
    period
  ) {
    this.nrc = nrc;
    this.code = code;
    this.name = name;
    this.sec = sec;
    this.cr = cr;
    this.cup = cup;
    this.dis = dis;
    this.proffesorName = proffesorName;
    this.ses = ses;
    this.hour = hour;
    this.days = days;
    this.building = building;
    this.classroom = classroom;
    this.period = period;
  }
}

module.exports = Subject;
