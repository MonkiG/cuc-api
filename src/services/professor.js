const BaseService = require("./base");

class ProfessorServices extends BaseService {
  constructor(repository) {
    super(repository);
  }

  async getAll() {
    const rows = await this.repository.getAll(); // Supongamos que cada fila tiene la estructura { professorName, subjectId, subjectName }
    const reducedData = rows.reduce((acc, curr) => {
      // Busca si el profesor ya está en el acumulador
      let professor = acc.find((x) => x.name === curr.name);

      if (!professor) {
        // Si el profesor no existe en el acumulador, se agrega con un arreglo de subjects vacío
        professor = {
          id: curr.id,
          name: curr.name,
          subjects: [],
        };
        acc.push(professor);
      }

      // Agrega el subject al arreglo de subjects del profesor actual
      professor.subjects.push(curr.subject_id);

      return acc;
    }, []);

    return reducedData;
  }

  async getById(id) {
    const rows = await this.repository.get(id);

    const reducedData = rows.reduce((acc, curr) => {
      // Verifica si ya existen datos del profesor en el acumulador
      if (!acc.id) {
        // Si no existen, inicializa el objeto del profesor con sus propiedades
        acc.id = curr.id;
        acc.name = curr.name;
        acc.subjects = [];
      }

      // Agrega el subject actual al arreglo de subjects
      acc.subjects.push(curr.subject_id);

      return acc;
    }, {});

    return reducedData;
  }
}

module.exports = ProfessorServices;
