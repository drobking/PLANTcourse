using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataAccess;
using DataAccess.Entity;
using DTO.Models;
using DTO.Models.Result;
using Microsoft.AspNetCore.Authorization;
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
        [HttpGet("GetUser")]
        public UserFront GetUser([FromQuery] string name)
        {
            //var FullName1 = _context.Users.FirstOrDefault(x => x.Email == name).UserAdditioanalInfo.FullName;
            var FullName1 = _context.Users.Where(x=>x.Email==name).Select(x => x.UserAdditioanalInfo.FullName).First();
            //var FullName3 = _context.Users.First(x => x.Email == name).UserAdditioanalInfo; ;
            var user = new UserFront
            {
                Email = name,
                Address = _context.Users.Where(x => x.Email == name).Select(x=>x.UserAdditioanalInfo).Select(x=>x.Address).First(),
                FullName = _context.Users.Where(x => x.Email == name).Select(x => x.UserAdditioanalInfo).Select(x => x.FullName).First(),
                 PlantNames = _context.usersAndPlants.Where(x => x.nameUser == FullName1).Select(x => x.namePlant).ToList()

            };
            return user;
        }
        [HttpGet]
        [Authorize]
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
        [HttpPost("addNamePlants")]
        public async Task<ResultDTO> AddNamePlants([FromBody] ModelPlantNameDTO model)
        {
            try
            {

                var userPlant = new UsersAndPlants {
                    namePlant = model.namePlant,
                    nameUser = model.nameUser
                };

                _context.usersAndPlants.Add(userPlant);
                _context.SaveChanges();

                return new ResultDTO()
                {
                    Message = "OK",
                    Status = 200
                };
            }
            catch (Exception e)
            {
                return new ResultErrorDTO
                {
                    Status = 500,
                    Message = e.Message,
                    Errors = new List<string>()
                    {
                        e.Message
                    }
                };
            }
        }
        [HttpGet("getAllNamePlants")]
        public List<string> getAllNamesPlant([FromQuery] string name)
        {

            return _context.usersAndPlants.Where(x => x.nameUser == name).Select(x => x.namePlant).ToList();
        }
    }
}
