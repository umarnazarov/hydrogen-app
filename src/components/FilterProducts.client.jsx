import React, { useState, useMemo, useCallback }  from 'react'

function FilterProducts({ products }) {
  const [selected, setSelected] = useState([]);
  let variants = useMemo(() => products.map(p => p.variants.edges.map(e => e.node.selectedOptions)), [products])

  function flatten(arr) {
    return arr.reduce(function (flat, toFlatten) {
      return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
    }, []);
  }

  const handleSelect = useCallback((e) => {
    const { id, value } = e.target
    if (!value) return 
    
    setSelected(st => {
      let selectIdx = st.findIndex(s => s?.name == id)
      if (selectIdx === -1) {
        return [...st, {name: id, value}]
      } else {
        return st.map(s => s.name === id ? {...s, value} : s)
      }
    })
  }, [])
  
  let formattedVariants = flatten(variants)

  let flatResult = useMemo(() => 
    formattedVariants.reduce((r, a, i) => {
      r[a.name] = r[a.name] || [];
      if (!r[a.name].length) {
        r[a.name].push({name: a.name});
      }
      r[a.name].push({value: a.value});
      return r;
    }, {})
  ,[])

  let renderOptions = []
  for (const property in flatResult) {
    renderOptions.push(
      <div key={property}>
        <label htmlFor={property}>{property}</label>
        <select defaultValue={''} onClick={handleSelect} id={property}>
          <option value="" disabled hidden></option>
          {flatResult[property].filter((obj, index, self) =>
            index === self.findIndex((t) => (
              t.value == obj.value && !obj.name
            ))
          )
            .map(opt => <option key={opt.value} value={opt.value}>{opt.value}</option>)}
        </select>
      </div>
    )
  }

  return (
    <div>
      {renderOptions.map(opt => opt)}
    </div>
  )
}

export default FilterProducts