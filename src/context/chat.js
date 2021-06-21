import { useRouter } from "next/router";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from "react";
import io from "socket.io-client";

const initialState = {
  messages: [],
  socketRef: null,
};

import { useAuthState } from "../context/auth";
import useSWR from "swr";

const StateContext = createContext(initialState);

const DispatchContext = createContext(null);

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "SOCKET":
      return {
        ...state,
        socketRef: payload,
      };
    case "MESSAGES":
      return {
        ...state,
        messages: payload,
      };

    case "MESSAGE":
      return {
        ...state,
        messages: [...state.messages, payload],
      };
    default:
      throw new Error(`Unknow action type: ${type}`);
  }
};

export const ChatProvider = ({ children }) => {
  const [state, defaultDispatch] = useReducer(reducer, initialState);

  const { user: currentUser } = useAuthState();

  const dispatch = (type, payload) => defaultDispatch({ type, payload });

  const socRef = useRef();

  const router = useRouter();

  const userId = router.query.userId;

  const { data: chatData } = useSWR(
    userId && currentUser?._id ? `/chat/${currentUser._id}/${userId}` : null
  );

  useEffect(() => {
    if (chatData) {
      dispatch("MESSAGES", chatData.data.chats);
    }
  }, [userId]);

  useEffect(() => {
    socRef.current = io("http://localhost:4000", {
      auth: {
        token: "Bearer " + currentUser?.token,
      },
    });

    dispatch("SOCKET", socRef);

    socRef.current.on("message", (data) => {
      console.log(data);
      dispatch("MESSAGE", data);
    });
    return () => {
      socRef.current && socRef.current.disconnect();
    };
  }, []);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export const useChatState = () => useContext(StateContext);
export const useChatDispatch = () => useContext(DispatchContext);
