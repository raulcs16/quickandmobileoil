import { Request, Response } from "express";
import { OilServiceRequest } from "../../../packages/core/oilservice/types";
import { ProcessOilServiceRequest } from "../../../packages/core/oilservice/useCases";

export default class OilServiceController {
  private m_processOilRequestUseCase: ProcessOilServiceRequest;
  constructor(processOilRequestUseCase: ProcessOilServiceRequest) {
    this.m_processOilRequestUseCase = processOilRequestUseCase;
  }
  public async processOilRequest(req: Request, res: Response) {
    try {
      const oilServiceRequest = req.body as OilServiceRequest;
      const response =
        await this.m_processOilRequestUseCase.execute(oilServiceRequest);
      if (response.ok) {
        res.status(201).json({ message: "form submitted!" });
      } else {
        res.status(404).json({ message: response.message });
      }
    } catch (error) {
      console.error("❌ Error processing booking route:", error);
      return res.status(500).json({
        error: "Internal server error occurred while processing your request.",
      });
    }
  }
}
