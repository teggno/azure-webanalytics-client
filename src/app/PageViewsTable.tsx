import React from "react";
import { PageView } from "./Model";

export default function(props: { pageViews: PageView[] }) {
  return (
    <table className="collapse ba br2 b--black-10 pv2 ph3 w-100">
      <thead>
        <tr>
          <th className="pv2 ph2 tl">URL</th>
          <th className="pv2 ph2">Views</th>
        </tr>
      </thead>
      <tbody>
        {props.pageViews.map(i => (
          <tr key={i.url} className="striped--light-gray ">
            <td className="pv2 ph2">{i.url}</td>
            <td className="pv2 ph2 tr">{i.pageViews}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
