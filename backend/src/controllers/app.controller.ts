import { OK } from "../constants/http";
import AppModel from "../models/app.model";
import catchErrors from "../utils/catchErrors";


const getAllApps = catchErrors(async (req,res) =>{
    const apps = await AppModel.find();
    return  res.json(apps);
});

const saveSelectedApps =catchErrors( async (req, res) => {
  const { businessId, selectedAppIds } = req.body;
  
  res.json({ success: true });
});