import path from "path";

(function main() {
    console.clear();
        
    const cwd = process.cwd(); //current_way_dir
    const path_resolve = path.resolve(cwd,"index.js");
    const path_resolve_absolute = path.resolve(cwd, "/teach", "kekis");
    console.log("-".repeat(80));
    console.log("cwd:", cwd);
    console.log("path_resolve:", path_resolve); //check absolute path
    console.log("path_resolve_absolute:", path_resolve_absolute);
    console.log("-".repeat(80));

    const path_basename = path.basename(path_resolve, ".js");
    console.log("path_basename:", path_basename);

    const path_dirname = path.dirname(path_resolve);
    console.log("path_dirname:", path_dirname);

    const path_extname = path.extname(path_resolve);
    console.log("path_extname", path_extname);

    const path_sep = path.sep;
    console.log("path_sep:", path_sep);

    const path_normalized = path.normalize("C:\\temp\\\\foo\\bar\\..\\");
    console.log("path_problem: 'C:\\temp\\\\foo\\bar\\..\\'", "path_normalized:", path_normalized);

    const path_parsed = path.parse(path_resolve);
    console.log("path_parsed:", path_parsed);

    const path_formated = path.parse(JSON.stringify(path_parsed));
    console.log("path_formated:", path_formated);

})()
