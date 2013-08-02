<?php

ini_set('display_errors', 1);

/**
 *
 */
class Server
{
    /**
     * @var string
     */
    protected $filePath;

    /**
     *
     */
    public function __construct()
    {
        $this->filePath = __DIR__ . '/db.json';
    }

    /**
     * @param $postData
     *
     * @return void
     */
    public function run($postData)
    {
        $method = $_SERVER['REQUEST_METHOD'];


        if ($method === 'POST') {
            $db = $this->getJsonObject();

            $colleagueData     = json_decode($postData);
            $colleagueData->id = rand(10000000, 99999999);

            $db[] = $colleagueData;

            $this->saveDb($db);

        } elseif ($method === 'DELETE') {

            if (isset($_REQUEST['id'])) {
                $id = (int) $_REQUEST['id'];

                $db = $this->getJsonObject();
                $newDb = $this->removeById($db, $id);
                $this->saveDb($newDb);
            }

        } else {
            echo $this->getDbFileContent();
        }
    }

    /**
     * @return mixed
     */
    private function getJsonObject()
    {
        $dbAsJsonObject = json_decode($this->getDbFileContent());

        if (!is_array($dbAsJsonObject)) {
            $dbAsJsonObject = array();
        }

        return array_values($dbAsJsonObject);
    }

    /**
     * @return string
     */
    private function getDbFileContent()
    {
        return file_get_contents($this->filePath);
    }

    /**
     * @param $db
     *
     * @return int
     */
    private function saveDb($db)
    {
        return file_put_contents($this->filePath, json_encode($db));
    }

    /**
     * @param $db
     * @param $id
     *
     * @return $db
     */
    private function removeById($db, $id)
    {
        foreach ($db as $rowId => $row) {
            if ($row->id === $id) {
                unset($db[$rowId]);
            }
        }

        return $db;
    }
}

$postData = isset($HTTP_RAW_POST_DATA) ? $HTTP_RAW_POST_DATA : null;

$server = new Server();
$server->run($postData);