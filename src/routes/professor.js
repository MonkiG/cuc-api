const { Router } = require("express");

const Pagination = require("./../models/Pagination");
const { getServerUrl } = require("./../utils");

const ProfessorServices = require("../services/professor");
const PgProfessorRepository = require("../services/repositories/PgProfessorRepository");

const router = Router();

const pgRepository = new PgProfessorRepository();
const professorService = new ProfessorServices(pgRepository);

router.get("/professor", async (req, res) => {
  let { page } = req.query;
  page = parseInt(page) || 1;

  const proffesors = await professorService.getAll();
  const serverUrl = getServerUrl(req);
  const parsedData = proffesors.map((x) => ({
    ...x,
    subjects: x.subjects.map((y) => `${serverUrl}/api/subject/${y}`),
    url: `${serverUrl}/api/professor/${x.id}`,
  }));
  const pagination = new Pagination(parsedData, `${serverUrl}/api/professor`);

  try {
    const paginatedProffesors = pagination.getPaginatedItems(page);
    const pageInfo = pagination.getPageInfo(page);

    return res.json({
      page: pageInfo,
      results: paginatedProffesors,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.get("/professor/:id", async (req, res) => {
  const { id } = req.params;
  const professor = await professorService.getById(id);

  const serverUrl = getServerUrl(req, "/api/subject");
  const parsedData = {
    ...professor,
    subjects: professor.subjects.map((x) => `${serverUrl}/${x}`),
  };
  return parsedData ? res.json(parsedData) : res.status(404).send();
});

module.exports = router;
