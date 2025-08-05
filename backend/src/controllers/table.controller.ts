import { OK, CREATED } from "../constants/http";
import catchErrors from "../utils/catchErrors";
import appAssert from "../utils/appAssert";
import tablesModel from "../models/tables.model";
import ApiResponse from "../utils/ApiResponse"; // adjust path if needed

// GET /tables/:outletId
export const getTablesHandler = catchErrors(async (req, res) => {
  const outletId = req.params.outletId;
  appAssert(outletId, 400, "Missing outletId");

  const tables = await tablesModel.find({ outletId });

  console.log("tables :",tables);

  return res
    .status(OK)
    .json(new ApiResponse(OK, tables, "Tables fetched successfully"));
});

// POST /tables/:tableId/reserve
export const reserveTableHandler = catchErrors(async (req, res) => {
  const tableId = req.params.tableId;
  const { name, phone, customerId } = req.body;

  const table = await tablesModel.findById(tableId);
  appAssert(table, 404, "Table not found");

  if (table.status === "Booked") {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Table already booked"));
  }

  table.status = "Booked";
  table.reservedBy = { name, phone, customerId };
  table.reservedAt = new Date();

  await table.save();

  return res
    .status(OK)
    .json(new ApiResponse(OK, table, "Table reserved successfully"));
});

// POST /tables
export const createTableHandler = catchErrors(async (req, res) => {
  const { outletId, tableNo, seats, status } = req.body;
  appAssert(outletId && tableNo, 400, "Missing outletId or tableNo");

  const newTable = await tablesModel.create({
    outletId,
    tableNo,
    seats,
    status,
  });

  return res
    .status(CREATED)
    .json(new ApiResponse(CREATED, newTable, "Table created successfully"));
});


// POST /tables/:tableId/available
export const makeTableAvailableHandler = catchErrors(async (req, res) => {
  const tableId = req.params.tableId;

  const table = await tablesModel.findById(tableId);
  appAssert(table, 404, "Table not found");

  table.status = "Available";
  table.reservedBy = undefined;
  table.reservedAt = undefined;

  await table.save();

  return res
    .status(OK)
    .json(new ApiResponse(OK, table, "Table marked as available"));
});

