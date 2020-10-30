using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataAccess;
using DataAccess.Entity;
using DTO.Models;
using DTO.Models.Result;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace PlantCourse.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlantController : ControllerBase
    {
        private readonly EFContext _context;
        public PlantController(EFContext context)
        {
            _context = context;
        }
        [HttpGet]
        public List<PlantDTO> getAllPlants()
        {
            return _context.Plants.Select(t => new PlantDTO
            {
                Temperature=t.Temperature,
                Humidity=t.Humidity,
                HumidityGras=t.HumidityGras,
                Name=t.Name,
                Water=t.Water
            }).ToList();
        }
        [HttpPost]
        public async Task<ResultDTO> AddPlant(PlantDTO model) {
            var plant = new Plant
            {
                Humidity = model.Humidity,
                HumidityGras = model.HumidityGras,
                Name = model.Name,
                Temperature = model.Temperature,
                Water = model.Water
            };
            _context.Plants.Add(plant);
            _context.SaveChanges();
            return new ResultDTO()
            {
                Message = "OK",
                Status = 200
            };
        }
    }
}
