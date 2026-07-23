import { Firestore } from "firebase-admin/firestore";
import { ProcessOilServiceRequest } from "../../packages/core/oilservice/useCases";
import { getFirestore } from "../../packages/firebase/admin";
import OilServiceRepo from "../../packages/core/oilservice/repo";
import { Notifier } from "../../packages/core/notification/types";
import FSOilServiceRepo from "../../packages/firebase/oil_service_repo";
import TelegramNotifier from "../../packages/core/notification/telegram";
import OilServiceController from "./controllers/oil-service-controller";

const token = process.env.TELEGRAM_BOT_TOKEN || "";
const chatId = process.env.TELEGRAM_CHAT_ID || "";
// 1. Initialize infrastructure instances
const fireStore: Firestore = getFirestore();
// 2. Instantiate Adapters (Concrete implementations of Ports)
const oilRepo: OilServiceRepo = new FSOilServiceRepo(fireStore);
const notifier: Notifier = new TelegramNotifier(token, chatId);

// 3. Instantiate Use Cases (Inject Ports)
const processOilServiceUseCase = new ProcessOilServiceRequest(
  oilRepo,
  notifier
);

const oilServiceController = new OilServiceController(processOilServiceUseCase);

// 5. Export Container Object
export const container = {
  oilServiceController,
};
