import React from "react";
// import { useSupabase } from "use-supabase";
// import { AuthNavigator } from "./AuthNavigator";
import { MainNavigator } from "./MainNavigator";

const RootNavigator = () => {
  return <MainNavigator />;

  // const supabase = useSupabase();

  // if (supabase.auth.session()) {
  //   return <MainNavigator />;
  // }

  // return <AuthNavigator />;
};

export default RootNavigator;
