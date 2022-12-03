import { subscriptionActions } from "./subscription-slice";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  onSnapshot,
  getDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import db from "../../firebase-config";

const deleteCollection = async (db, collectionUrl) => {
  const collectionSnap = await getDocs(query(collection(db, collectionUrl)));
  const docIds = collectionSnap.docs.map((doc) => doc.id);
  console.log(docIds);
  for (const id of docIds) {
    await deleteDoc(doc(db, collectionUrl, `${id}`));
  }
};

export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      // TODO : FETCH THE DATA
      const productSnapshot = await getDocs(
        query(collection(db, "products"), where("active", "==", true))
      );

      const products = [];
      productSnapshot.forEach((productDoc) => {
        const product = {
          ...productDoc.data(),
          id: productDoc.id,
        };
        products.push(product);
      });
      for (const product of products) {
        const prices = await getDocs(
          query(collection(db, `products/${product.id}/prices`))
        );
        const priceItems = prices.docs.map((price) => ({
          id: price.id,
          ...price.data(),
        }));
        product["prices"] = priceItems;
      }
      dispatch(subscriptionActions.setInitialProducts(products));
    } catch (error) {
      // TODO: SET THE ERROR
      console.error(error);
    }
  };
};

export const fetchSubscriptionInfo = (userId) => {
  return async (dispatch) => {
    try {
      // fetch subscription info
      const subSnashot = await getDocs(
        query(collection(db, `customers/${userId}/subscriptions`))
      );
      const subscriptionInfo = subSnashot.docs.map((sub) => {
        const data = sub.data();
        return {
          plan: data?.items[0]?.price?.product?.name,
          price: data?.items[0]?.price?.unit_amount,
          renewalDate: data.current_period_end?.seconds,
        };
      });
      if (subscriptionInfo.length === 0) {
        dispatch(subscriptionActions.setSubscriptionInfo(null));
      } else {
        dispatch(subscriptionActions.setSubscriptionInfo(subscriptionInfo[0]));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const checkoutSubscription = (priceId, userId) => {
  return async (dispatch) => {
    console.log(priceId, userId);
    console.log("checkout started");
    try {
      // TODO
      dispatch(subscriptionActions.setCheckoutError(null));
      dispatch(subscriptionActions.setCheckoutLoading(true));
      
      // DELETE PREVIOUS SUBSCRIPTION
      await deleteCollection(db, `customers/${userId}/subscriptions`);
      await deleteCollection(db, `customers/${userId}/checkout_sessions`);
      await deleteCollection(db, `customers/${userId}/payments`);

      const docRef = await addDoc(
        collection(db, `customers/${userId}/checkout_sessions`),
        {
          price: priceId,
          success_url: window.location.origin,
          cancel_url: window.location.origin,
        }
      );
      const docSnap = onSnapshot(docRef, (doc) => {
        console.log(" data: ", doc.data());
        const { error, sessionId, url } = doc.data();
        if (error) {
          throw new Error("Error during payment transaction");
        }
        if (url) {
          window.location.assign(url);
        }
      });
      dispatch(subscriptionActions.setCheckoutLoading(false));
    } catch (error) {
      console.log(error);
      dispatch(subscriptionActions.setCheckoutLoading(false));
      dispatch(subscriptionActions.setCheckoutError(error));
    }
  };
};

export const cancelSubscription = (userId) => {
  return async (dispatch) => {
    try {
      console.log("reached cancel thunk");
      dispatch(subscriptionActions.setCheckoutError(null));
      dispatch(subscriptionActions.setCheckoutLoading(true));
      // check the collection is present
      await deleteCollection(db, `customers/${userId}/subscriptions`);
      await deleteCollection(db, `customers/${userId}/checkout_sessions`);
      await deleteCollection(db, `customers/${userId}/payments`);

      dispatch(subscriptionActions.setCheckoutLoading(false));
      dispatch(subscriptionActions.setSubscriptionInfo(null));
    } catch (error) {
      console.log(error);
      dispatch(subscriptionActions.setCheckoutLoading(false));
      dispatch(subscriptionActions.setCheckoutError(error));
    }
  };
};


