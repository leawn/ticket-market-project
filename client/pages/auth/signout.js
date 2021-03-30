import { useEffect } from "react";
import Router from "next/router"
import useRequest from "../../hooks/use-request";

export default () => {
    const { doRequest } = useRequest({
        url: "/api/users/signout",
        method: "post",
        body: {},
        onSuccess: () => Router.push("/")
    });

    useEffect(() => {
        doRequest()
            .catch(err => {
                console.log(err);
            });
        // hope that 'catch' statement won't cause any errors itself
    }, []);

    return <div>Signing you out...</div>
}