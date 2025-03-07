import { DataTypes, QueryTypes } from "sequelize";
import { databaseSIRS } from "../config/Database.js";

export const rlSatuTitikDuaHeader = databaseSIRS.define('rl_satu_titik_dua',
  {
    rs_id: {
      type: DataTypes.STRING
    },
    tahun: {
      type: DataTypes.INTEGER
    },
    user_id: {
      type: DataTypes.INTEGER
    },
  }
)

export const rlSatuTitikDuaDetail = databaseSIRS.define('rl_satu_titik_dua_detail', {
  rl_satu_titik_dua_id: {
    type: DataTypes.INTEGER,
  },
  tahun: {
    type: DataTypes.INTEGER,
  },
  bor: {
    type: DataTypes.DECIMAL,
  },
  los: {
    type: DataTypes.INTEGER,
  },
  bto: {
    type: DataTypes.DECIMAL,
  },
  toi: {
    type: DataTypes.DECIMAL,
  },
  ndr: {
    type: DataTypes.DECIMAL,
  },
  gdr: {
    type: DataTypes.DECIMAL,
  },
  rata_kunjungan: {
    type: DataTypes.DECIMAL,
  },
  rs_id: {
    type: DataTypes.STRING,
  },
  user_id: {
    type: DataTypes.INTEGER,
  }
}
)
rlSatuTitikDuaHeader.hasMany(rlSatuTitikDuaDetail, {
  foreignKey: 'rl_satu_titik_dua_id'
})

rlSatuTitikDuaDetail.belongsTo(rlSatuTitikDuaHeader, {
  foreignKey: 'id'
})


export const getRLSatuTitikDua = (req, callback) => {
  const sqlSelect = 'SELECT ' +
    'bor, los, bto, toi, ndr, gdr '

  const sqlFrom = 'FROM rl_satu_titik_dua_detail '

  const sqlWhere = 'WHERE '

  const filter = []
  const sqlFilterValue = []

  const rsId = req.query.rsId || null
  const tahun = req.query.tahun || null

  if (rsId != null) {
    filter.push("rs_id IN ( ? ) ")
    sqlFilterValue.push(req.query.rsId.split(';'))
  }
  if (tahun != null) {
    filter.push("tahun = ? ")
    sqlFilterValue.push(tahun)
  }

  let sqlFilter = ''
  filter.forEach((value, index) => {
    if (index == 0) {
      sqlFilter = sqlWhere.concat(value)
    } else if (index > 0) {
      sqlFilter = sqlFilter.concat(' AND ').concat(value)
    }
  })

  const sql = sqlSelect.concat(sqlFrom).concat(sqlFilter)
  databaseSIRS.query(sql, {
    type: QueryTypes.SELECT,
    replacements: sqlFilterValue
  })
    .then((res) => {
      console.log(res)
      callback(null, res)
    })
    .catch((error) => {
      console.log(error)
      callback(error, null)
    })
}
